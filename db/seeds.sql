-- Seed Categories
INSERT INTO categories (category_name)
VALUES 
    ('Holidays'),
    ('Personal'),
    ('Work'),
    ('Fitness'),
    ('Health');

-- Seed Users
INSERT INTO users (username, email, password)
VALUES 
    ('user1', 'user1@example.com', 'password1'),
    ('user2', 'user2@example.com', 'password2'),
    ('user3', 'user3@example.com', 'password3');

-- Seed Holidays (These should eventually be replaced with API data)
INSERT INTO holidays (holiday_name, holiday_date) VALUES
    ('New Years Day', '2024-01-01'),
    ('Independence Day', '2024-07-04'),
    ('Christmas Day', '2024-12-25');

-- Seed Moon Phases (These should eventually be replaced with API data)
INSERT INTO moon_phases (phase_name, phase_date) VALUES
    ('New Moon', '2024-01-11'),
    ('First Quarter', '2024-01-18'),
    ('Full Moon', '2024-01-25'),
    ('Last Quarter', '2024-02-02');

-- Example Events for Testing Purposes (You should replace these with actual API data)
INSERT INTO events (event_name, event_description, event_location, event_start, event_end, user_id)
VALUES
    ('New Years Day', 'Celebrate the New Year.', 'Various', '2024-01-01 00:00:00', '2024-01-01 23:59:59', 1),
    ('Independence Day', 'Celebrate Independence Day.', 'Various', '2024-07-04 00:00:00', '2024-07-04 23:59:59', 1),
    ('New Moon', 'The Moon is not visible.', 'Sky', '2024-01-10 00:00:00', '2024-01-10 23:59:59', 2),
    ('Full Moon', 'The Moon is fully illuminated.', 'Sky', '2024-01-25 00:00:00', '2024-01-25 23:59:59', 2);
