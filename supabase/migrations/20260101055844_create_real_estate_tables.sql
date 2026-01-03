/*
  # Real Estate Company Database

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `area` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Properties: public read-only
    - Contact submissions: public insert, no read access
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  area text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are publicly readable"
  ON properties
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
