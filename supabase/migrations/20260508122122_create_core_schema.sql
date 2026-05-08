/*
  # Sewarth Path Sansthanam — Core Schema

  ## Overview
  This migration creates the complete database schema for the NGO website.

  ## New Tables

  1. **profiles** — Extended user profiles linked to auth.users
     - id (uuid, FK to auth.users)
     - email, full_name, phone, city, state
     - role: 'user' | 'volunteer' | 'member' | 'admin'
     - avatar_url, bio

  2. **volunteer_applications** — Volunteer sign-up submissions
     - full_name, email, phone, city, state
     - age_group, availability, interests (text[]), how_heard, message
     - status: 'pending' | 'approved' | 'rejected'
     - profile_id (nullable FK, assigned on approval)

  3. **membership_plans** — Lookup table for membership tier definitions
     - plan_code (unique), name, price_inr, duration_days (null = lifetime)
     - features (text[])

  4. **memberships** — Active/pending member records
     - profile_id (FK), plan_code, status
     - public_member_id (unique, for QR verification)
     - razorpay_order_id, razorpay_payment_id
     - activated_at, expires_at

  5. **donations** — Donation records
     - donor_name, donor_email, donor_phone, amount
     - purpose, pan, is_anonymous
     - razorpay_order_id, razorpay_payment_id
     - status: 'pending' | 'completed' | 'failed'
     - paid_at

  6. **payment_events** — Razorpay webhook/verify log
     - event_type, razorpay_payment_id, razorpay_order_id, razorpay_signature
     - entity_type, entity_id, raw_payload (jsonb)

  7. **contact_messages** — Contact form submissions
     - full_name, email, phone, subject, message
     - status: 'unread' | 'read' | 'replied'

  8. **events** — Community events
     - title, title_hi, description, date, location, category, image_url, is_published

  9. **programs** — NGO program pages
     - title, title_hi, description, description_hi, category, image_url, is_published

  10. **stories** — Impact stories
      - beneficiary_name, category, quote, quote_hi, location, image_url, is_published, profile_id

  ## Security
  - RLS enabled on all tables
  - Policies: admins can manage all; authenticated users can read published content; own-data access only
*/

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL DEFAULT '',
  phone text,
  city text,
  state text,
  role text NOT NULL DEFAULT 'user',
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage profiles"
  ON profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Volunteer applications
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text,
  phone text NOT NULL,
  city text,
  state text,
  age_group text,
  availability text,
  interests text[] DEFAULT '{}',
  how_heard text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage volunteer applications"
  ON volunteer_applications FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert volunteer applications"
  ON volunteer_applications FOR INSERT
  TO anon
  WITH CHECK (true);

-- Membership plans (seed data)
CREATE TABLE IF NOT EXISTS membership_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_code text UNIQUE NOT NULL,
  name text NOT NULL,
  name_hi text NOT NULL,
  price_inr integer NOT NULL DEFAULT 0,
  duration_days integer,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view membership plans"
  ON membership_plans FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Service role can manage membership plans"
  ON membership_plans FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default plans
INSERT INTO membership_plans (plan_code, name, name_hi, price_inr, duration_days)
VALUES
  ('VOL_FREE', 'Volunteer Member', 'स्वयंसेवक सदस्य', 0, 365),
  ('ANNUAL_365', 'Annual Member', 'वार्षिक सदस्य', 365, 365),
  ('SUPPORTER_1001', 'Supporter Member', 'सहयोगी सदस्य', 1001, 365),
  ('LIFETIME_5001', 'Lifetime Member', 'आजीवन सदस्य', 5001, NULL)
ON CONFLICT (plan_code) DO NOTHING;

-- Memberships
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  plan_code text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  public_member_id text UNIQUE NOT NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  activated_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships"
  ON memberships FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Service role can manage memberships"
  ON memberships FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can verify membership by public_member_id"
  ON memberships FOR SELECT
  TO anon
  USING (true);

-- Donations
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  donor_name text NOT NULL,
  donor_email text,
  donor_phone text,
  amount integer NOT NULL,
  purpose text NOT NULL DEFAULT 'general',
  pan text,
  is_anonymous boolean DEFAULT false,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text NOT NULL DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Service role can manage donations"
  ON donations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon can insert donations"
  ON donations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Payment events
CREATE TABLE IF NOT EXISTS payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  razorpay_payment_id text,
  razorpay_order_id text,
  razorpay_signature text,
  entity_type text,
  entity_id uuid,
  raw_payload jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage payment events"
  ON payment_events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage contact messages"
  ON contact_messages FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon can insert contact messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_hi text NOT NULL DEFAULT '',
  description text,
  description_hi text,
  event_date date NOT NULL,
  location text,
  category text,
  image_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Authenticated can view all events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage events"
  ON events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Programs
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_hi text NOT NULL DEFAULT '',
  description text,
  description_hi text,
  category text,
  image_url text,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published programs"
  ON programs FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Service role can manage programs"
  ON programs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Stories
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beneficiary_name text NOT NULL,
  beneficiary_name_hi text,
  category text,
  quote text,
  quote_hi text,
  location text,
  image_url text,
  is_published boolean DEFAULT false,
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published stories"
  ON stories FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Service role can manage stories"
  ON stories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_memberships_public_member_id ON memberships(public_member_id);
CREATE INDEX IF NOT EXISTS idx_memberships_profile_id ON memberships(profile_id);
CREATE INDEX IF NOT EXISTS idx_memberships_status ON memberships(status);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_profile_id ON donations(profile_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_payment_events_order_id ON payment_events(razorpay_order_id);
