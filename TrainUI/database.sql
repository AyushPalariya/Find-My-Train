create database findmytrain1;
use findmytrain1;
INSERT INTO train (train_name, train_number) VALUES
('Rajdhani Express', '12001'),
('Shatabdi Express', '12002'),
('Duronto Express', '12003'),
('Garib Rath', '12004'),
('AC Double Decker', '12005'),
('Humsafar Express', '12006'),
('Tejas Express', '12007'),
('Vande Bharat Express', '12008'),
('Golden Chariot', '12009'),
('Maharajas Express', '12010');
INSERT INTO station (station_name, station_code) VALUES
('New Delhi', 'NDLI'),
('Mumbai Central', 'MUMB'),
('Bengaluru City', 'BNGL'),
('Hyderabad Deccan', 'HYD'),
('Chennai Central', 'CHN'),
('Kolkata', 'KOL'),
('Pune', 'PUN'),
('Ahmedabad', 'AMD'),
('Jaipur', 'JAI'),
('Lucknow', 'LKO'),
('Indore', 'INDO'),
('Nagpur', 'NGP'),
('Visakhapatnam', 'VSP'),
('Coimbatore', 'CBE'),
('Chandigarh', 'CHD');
INSERT INTO train_schedule (train_id, source_station_id, destination_station_id, departure_time, arrival_time) VALUES
-- Rajdhani Express (Train 12001)
(1, 1, 2, '06:00 AM', '11:30 PM'),
(1, 2, 1, '07:00 AM', '12:30 AM'),
(1, 1, 3, '08:00 PM', '06:30 AM'),
(1, 3, 1, '09:30 PM', '07:00 AM'),

-- Shatabdi Express (Train 12002)
(2, 1, 7, '06:00 AM', '02:30 PM'),
(2, 7, 1, '03:00 PM', '11:30 PM'),
(2, 2, 4, '07:00 AM', '04:00 PM'),
(2, 4, 2, '08:00 AM', '05:00 PM'),

-- Duronto Express (Train 12003)
(3, 1, 5, '10:00 AM', '08:00 AM'),
(3, 5, 1, '11:00 PM', '09:00 AM'),
(3, 2, 6, '12:00 PM', '10:00 PM'),
(3, 6, 2, '01:00 PM', '11:00 PM'),

-- Garib Rath (Train 12004)
(4, 1, 10, '04:00 AM', '02:00 PM'),
(4, 10, 1, '05:00 AM', '03:00 PM'),
(4, 3, 2, '06:00 AM', '04:00 PM'),
(4, 2, 3, '07:00 AM', '05:00 PM'),

-- AC Double Decker (Train 12005)
(5, 2, 4, '08:00 AM', '06:00 PM'),
(5, 4, 2, '09:00 AM', '07:00 PM'),
(5, 1, 5, '10:00 AM', '08:00 PM'),
(5, 5, 1, '11:00 AM', '09:00 PM'),

-- Humsafar Express (Train 12006)
(6, 3, 2, '12:00 PM', '12:00 AM'),
(6, 2, 3, '01:00 PM', '01:00 AM'),
(6, 4, 1, '02:00 PM', '02:00 AM'),
(6, 1, 4, '03:00 PM', '03:00 AM'),

-- Tejas Express (Train 12007)
(7, 1, 7, '06:30 AM', '02:00 PM'),
(7, 7, 1, '03:30 PM', '11:00 PM'),
(7, 2, 8, '07:30 AM', '03:00 PM'),
(7, 8, 2, '04:30 PM', '12:00 AM'),

-- Vande Bharat Express (Train 12008)
(8, 1, 9, '05:00 AM', '11:00 AM'),
(8, 9, 1, '12:00 PM', '06:00 PM'),
(8, 2, 5, '06:00 AM', '12:00 PM'),
(8, 5, 2, '01:00 PM', '07:00 PM'),

-- Golden Chariot (Train 12009)
(9, 1, 11, '07:00 AM', '04:00 PM'),
(9, 11, 1, '08:00 AM', '05:00 PM'),
(9, 3, 4, '09:00 AM', '06:00 PM'),
(9, 4, 3, '10:00 AM', '07:00 PM'),

-- Maharajas Express (Train 12010)
(10, 2, 5, '11:00 PM', '11:00 AM'),
(10, 5, 2, '12:00 AM', '12:00 PM'),
(10, 1, 12, '01:00 AM', '01:00 PM'),
(10, 12, 1, '02:00 AM', '02:00 PM');

select * from train_schedule;