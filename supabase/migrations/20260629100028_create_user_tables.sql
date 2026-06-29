/*
# FactoryOS User Tables

Creates user-specific tables for multi-user features:
- profiles: Extended user profiles linked to auth.users
- admin_roles: Admin access control
- ai_history: AI Copilot conversation history  
- api_keys: Developer API access
- invoices: Billing invoices
- subscriptions: User subscription plans
*/

-- PROFILES (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  company_name text DEFAULT '',
  role text DEFAULT 'manager',
  avatar_url text DEFAULT '',
  phone text DEFAULT '',
  factory_sites integer DEFAULT 1,
  subscription_plan text DEFAULT 'starter',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_sel" ON profiles;
CREATE POLICY "profiles_sel" ON profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "profiles_ins" ON profiles;
CREATE POLICY "profiles_ins" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "profiles_upd" ON profiles;
CREATE POLICY "profiles_upd" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "profiles_del" ON profiles;
CREATE POLICY "profiles_del" ON profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ADMIN ROLES
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  permissions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_sel" ON admin_roles;
CREATE POLICY "admin_sel" ON admin_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_ins" ON admin_roles;
CREATE POLICY "admin_ins" ON admin_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_upd" ON admin_roles;
CREATE POLICY "admin_upd" ON admin_roles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_del" ON admin_roles;
CREATE POLICY "admin_del" ON admin_roles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- AI HISTORY
CREATE TABLE IF NOT EXISTS ai_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  conversation_id uuid DEFAULT gen_random_uuid(),
  query text NOT NULL,
  response text DEFAULT '',
  context jsonb DEFAULT '{}',
  file_attachments jsonb DEFAULT '[]',
  anomaly_detected boolean DEFAULT false,
  anomaly_details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_sel" ON ai_history;
CREATE POLICY "ai_sel" ON ai_history FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_ins" ON ai_history;
CREATE POLICY "ai_ins" ON ai_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_upd" ON ai_history;
CREATE POLICY "ai_upd" ON ai_history FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_del" ON ai_history;
CREATE POLICY "ai_del" ON ai_history FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- API KEYS
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  key_hash text NOT NULL,
  key_prefix text NOT NULL,
  permissions jsonb DEFAULT '{}',
  last_used_at timestamptz,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "keys_sel" ON api_keys;
CREATE POLICY "keys_sel" ON api_keys FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "keys_ins" ON api_keys;
CREATE POLICY "keys_ins" ON api_keys FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "keys_upd" ON api_keys;
CREATE POLICY "keys_upd" ON api_keys FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "keys_del" ON api_keys;
CREATE POLICY "keys_del" ON api_keys FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- INVOICES
CREATE TABLE IF NOT EXISTS user_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  invoice_number text NOT NULL UNIQUE,
  amount_cents integer NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending',
  due_date date,
  paid_at timestamptz,
  plan_name text DEFAULT 'starter',
  items jsonb DEFAULT '[]',
  pdf_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "inv_sel" ON user_invoices;
CREATE POLICY "inv_sel" ON user_invoices FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "inv_ins" ON user_invoices;
CREATE POLICY "inv_ins" ON user_invoices FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "inv_upd" ON user_invoices;
CREATE POLICY "inv_upd" ON user_invoices FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "inv_del" ON user_invoices;
CREATE POLICY "inv_del" ON user_invoices FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  plan_name text NOT NULL DEFAULT 'starter',
  status text DEFAULT 'trialing',
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT now() + interval '14 days',
  cancel_at_period_end boolean DEFAULT false,
  stripe_subscription_id text DEFAULT '',
  stripe_customer_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sub_sel" ON user_subscriptions;
CREATE POLICY "sub_sel" ON user_subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "sub_ins" ON user_subscriptions;
CREATE POLICY "sub_ins" ON user_subscriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "sub_upd" ON user_subscriptions;
CREATE POLICY "sub_upd" ON user_subscriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "sub_del" ON user_subscriptions;
CREATE POLICY "sub_del" ON user_subscriptions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- USER NOTIFICATIONS
CREATE TABLE IF NOT EXISTS user_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text DEFAULT 'info',
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  read_at timestamptz,
  action_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "unotif_sel" ON user_notifications;
CREATE POLICY "unotif_sel" ON user_notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "unotif_ins" ON user_notifications;
CREATE POLICY "unotif_ins" ON user_notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "unotif_upd" ON user_notifications;
CREATE POLICY "unotif_upd" ON user_notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "unotif_del" ON user_notifications;
CREATE POLICY "unotif_del" ON user_notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_history_user ON ai_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_history_conv ON ai_history(conversation_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_user_invoices_user ON user_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subs_user ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifs_user ON user_notifications(user_id);