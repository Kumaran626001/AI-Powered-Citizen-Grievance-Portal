-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 23, 2026 at 08:07 AM
-- Server version: 9.1.0
-- PHP Version: 8.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grievance_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_taken`
--

DROP TABLE IF EXISTS `action_taken`;
CREATE TABLE IF NOT EXISTS `action_taken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` varchar(50) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `action_notes` text,
  `updated_status` enum('PENDING','IN_PROGRESS','RESOLVED') DEFAULT NULL,
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `admin_id` (`admin_id`),
  KEY `ix_action_taken_id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `action_taken`
--

INSERT INTO `action_taken` (`id`, `ticket_id`, `admin_id`, `action_notes`, `updated_status`, `created_at`) VALUES
(1, 'TKT018', 1, 'Action Taken', 'RESOLVED', '2026-05-22 19:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_admins_username` (`username`),
  KEY `ix_admins_id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`) VALUES
(1, 'admin@123', 'admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
CREATE TABLE IF NOT EXISTS `complaints` (
  `ticket_id` varchar(50) NOT NULL,
  `citizen_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `specific_location` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `evidence_path` varchar(255) DEFAULT NULL,
  `predicted_category` varchar(100) DEFAULT NULL,
  `urgency_level` varchar(50) DEFAULT NULL,
  `priority_score` float DEFAULT NULL,
  `status` enum('PENDING','IN_PROGRESS','RESOLVED') DEFAULT NULL,
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`ticket_id`),
  KEY `ix_complaints_ticket_id` (`ticket_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`ticket_id`, `citizen_name`, `phone_number`, `district`, `city`, `specific_location`, `location`, `description`, `evidence_path`, `predicted_category`, `urgency_level`, `priority_score`, `status`, `created_at`) VALUES
('TKT020', 'Ajith', '9333344444', 'Krishnagiri', 'Hosur', 'Industrial Area', 'Industrial Area', 'Road blocked due to damage', '/uploads/TKT020.jpg', 'Road Department', 'High', 85.6, 'PENDING', '2026-05-22 18:45:42'),
('TKT019', 'Preethi', '9000099999', 'Nagapattinam', 'Mayiladuthurai', 'Beach Street', 'Beach Street', 'Electric pole damaged after storm', '/uploads/TKT019.jpg', 'Electricity Department', 'High', 96.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT018', 'Hari', '9777712345', 'Villupuram', 'Tindivanam', 'Near Hospital', 'Near Hospital', 'Water contamination issue reported', '/uploads/TKT018.jpg', 'Water Department', 'High', 93.2, 'RESOLVED', '2026-05-22 18:45:42'),
('TKT017', 'Janani', '9888877766', 'Cuddalore', 'Panruti', 'Bus Stand Area', 'Bus Stand Area', 'Garbage dumped near bus stand', '/uploads/TKT017.jpg', 'Sanitation Department', 'Medium', 58.9, 'PENDING', '2026-05-22 18:45:42'),
('TKT016', 'Naveen', '9554433221', 'Vellore', 'Katpadi', 'Near Railway Station', 'Near Railway Station', 'Huge potholes near station road', '/uploads/TKT016.jpg', 'Road Department', 'Medium', 60.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT014', 'Sowmiya', '9654321876', 'Namakkal', 'Rasipuram', 'Market Area', 'Market Area', 'No drinking water supply', '/uploads/TKT014.jpg', 'Water Department', 'High', 89.9, 'PENDING', '2026-05-22 18:45:42'),
('TKT015', 'Ashwin', '9443322110', 'Thoothukudi', 'Kovilpatti', 'Near School', 'Near School', 'Street lights flickering continuously', '/uploads/TKT015.jpg', 'Electricity Department', 'Low', 42.7, 'PENDING', '2026-05-22 18:45:42'),
('TKT013', 'Mohan', '9786543211', 'Karur', 'Kulithalai', 'Near Temple', 'Near Temple', 'Drainage blockage causing water stagnation', '/uploads/TKT013.jpg', 'Sanitation Department', 'High', 86.3, 'PENDING', '2026-05-22 18:45:42'),
('TKT012', 'Keerthana', '9871234567', 'Dindigul', 'Batlagundu', 'Main Road', 'Main Road', 'Road damaged badly after rain', '/uploads/TKT012.jpg', 'Road Department', 'High', 84.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT011', 'Lokesh', '9344455667', 'Dharmapuri', 'Palacode', 'Near College', 'Near College', 'Frequent power cuts in locality', '/uploads/TKT011.jpg', 'Electricity Department', 'Medium', 55.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT010', 'Harini', '9776655443', 'Tiruppur', 'Avinashi', 'Near Bus Depot', 'Near Bus Depot', 'Water pipe burst near residential area', '/uploads/TKT010.jpg', 'Water Department', 'High', 91.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT009', 'Vignesh', '9445566778', 'Kanyakumari', 'Nagercoil', 'Beach Road', 'Beach Road', 'Broken road causing traffic congestion', '/uploads/TKT009.jpg', 'Road Department', 'Medium', 64.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT008', 'Anitha', '9887766554', 'Tirunelveli', 'Palayamkottai', 'Near Park', 'Near Park', 'Garbage bins overflowing near park', '/uploads/TKT008.jpg', 'Sanitation Department', 'Medium', 59.6, 'PENDING', '2026-05-22 18:45:42'),
('TKT007', 'Ravi', '9001122334', 'Erode', 'Perundurai', 'Near School', 'Near School', 'Electric transformer sparking continuously', '/uploads/TKT007.jpg', 'Electricity Department', 'High', 97.4, 'PENDING', '2026-05-22 18:45:42'),
('TKT006', 'Meena', '9556677889', 'Trichy', 'Srirangam', 'Temple Road', 'Temple Road', 'No water supply for 2 days', '/uploads/TKT006.jpg', 'Water Department', 'High', 90.3, 'PENDING', '2026-05-22 18:45:42'),
('TKT005', 'Saran', '9345678912', 'Salem', 'Hasthampatti', 'Ward 4', 'Ward 4', 'Drainage overflow causing bad smell', '/uploads/TKT005.jpg', 'Sanitation Department', 'High', 88.4, 'PENDING', '2026-05-22 18:45:42'),
('TKT004', 'Divya', '9090909090', 'Chennai', 'T Nagar', 'Near Signal', 'Near Signal', 'Road full of potholes causing accidents', '/uploads/TKT004.jpg', 'Road Department', 'High', 95.6, 'PENDING', '2026-05-22 18:45:42'),
('TKT003', 'Karthik', '9988776655', 'Virudhunagar', 'Sivakasi', 'Near Market', 'Near Market', 'Garbage not collected for one week', '/uploads/TKT003.jpg', 'Sanitation Department', 'Medium', 57.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT002', 'Priya', '9123456780', 'Madurai', 'Anna Nagar', 'Opposite Hospital', 'Opposite Hospital', 'Street lights not working during night', '/uploads/TKT002.jpg', 'Electricity Department', 'Medium', 61.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT001', 'Arun Kumar', '9876543210', 'Coimbatore', 'Gandhipuram', 'Near Bus Stand', 'Near Bus Stand', 'Water leakage from pipeline for 3 days', '/uploads/TKT001.jpg', 'Water Department', 'High', 92.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT-DA18DA62', 'Saran', '98399893', 'Virudhunagar', 'Rajapalayam', 'Near Murugan Temple', 'Near Murugan Temple', 'Garbage not Collected for 5 days\r\n', '/uploads/TKT-DA18DA62.jpg', 'Sanitation Department', 'Medium', 50.17, 'PENDING', '2026-05-22 18:39:09'),
('TKT021', 'Bharath', '9001122556', 'Ariyalur', 'Jayankondam', 'Ward 6', 'Ward 6', 'Drainage water overflowing into roads', '/uploads/TKT021.jpg', 'Sanitation Department', 'High', 87.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT022', 'Renu', '9874501236', 'Perambalur', 'Kunnam', 'Near Temple', 'Near Temple', 'No water supply in area', '/uploads/TKT022.jpg', 'Water Department', 'Medium', 65.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT023', 'Deepak', '9556671234', 'Ramanathapuram', 'Paramakudi', 'Near Bus Stop', 'Near Bus Stop', 'Frequent electricity shutdowns', '/uploads/TKT023.jpg', 'Electricity Department', 'Medium', 63.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT024', 'Pooja', '9445512345', 'Sivagangai', 'Karaikudi', 'College Road', 'College Road', 'Damaged roads causing accidents', '/uploads/TKT024.jpg', 'Road Department', 'High', 88.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT025', 'Aravind', '9888899111', 'Tenkasi', 'Courtallam', 'Near Waterfalls', 'Near Waterfalls', 'Garbage accumulation near tourist spot', '/uploads/TKT025.jpg', 'Sanitation Department', 'Medium', 54.9, 'PENDING', '2026-05-22 18:45:42'),
('TKT026', 'Shalini', '9345677777', 'Chengalpattu', 'Tambaram', 'Near Flyover', 'Near Flyover', 'Water leakage from underground pipe', '/uploads/TKT026.jpg', 'Water Department', 'High', 92.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT027', 'Kavin', '9555566666', 'Kanchipuram', 'Uthiramerur', 'Near School', 'Near School', 'Street light poles damaged', '/uploads/TKT027.jpg', 'Electricity Department', 'Low', 44.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT028', 'Nithya', '9000012345', 'Thanjavur', 'Kumbakonam', 'Temple Area', 'Temple Area', 'Road cracks causing vehicle damage', '/uploads/TKT028.jpg', 'Road Department', 'Medium', 67.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT029', 'Surya', '9888811111', 'Nilgiris', 'Ooty', 'Lake Road', 'Lake Road', 'Garbage issue near lake', '/uploads/TKT029.jpg', 'Sanitation Department', 'Medium', 59.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT030', 'Aarthi', '9777722222', 'Pudukkottai', 'Aranthangi', 'Main Bazaar', 'Main Bazaar', 'Drinking water issue in locality', '/uploads/TKT030.jpg', 'Water Department', 'High', 89.4, 'PENDING', '2026-05-22 18:45:42'),
('TKT031', 'Vasanth', '9444400001', 'Coimbatore', 'Pollachi', 'Near Market', 'Near Market', 'Electric transformer exploded', '/uploads/TKT031.jpg', 'Electricity Department', 'High', 98.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT032', 'Monika', '9555500002', 'Madurai', 'Melur', 'Near School', 'Near School', 'Road flooded after rain', '/uploads/TKT032.jpg', 'Road Department', 'High', 86.9, 'PENDING', '2026-05-22 18:45:42'),
('TKT033', 'Sanjay', '9888800003', 'Virudhunagar', 'Rajapalayam', 'Ward 10', 'Ward 10', 'Garbage not removed for days', '/uploads/TKT033.jpg', 'Sanitation Department', 'Medium', 57.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT034', 'Lavanya', '9777700004', 'Salem', 'Mettur', 'Near Dam', 'Near Dam', 'Water pipeline broken', '/uploads/TKT034.jpg', 'Water Department', 'High', 90.7, 'PENDING', '2026-05-22 18:45:42'),
('TKT035', 'Prakash', '9666600005', 'Trichy', 'Manapparai', 'Bus Depot', 'Bus Depot', 'Power fluctuation damaging appliances', '/uploads/TKT035.jpg', 'Electricity Department', 'Medium', 62.6, 'PENDING', '2026-05-22 18:45:42'),
('TKT036', 'Swetha', '9555500006', 'Erode', 'Gobichettipalayam', 'Near Temple', 'Near Temple', 'Road condition very poor', '/uploads/TKT036.jpg', 'Road Department', 'Medium', 66.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT037', 'Dinesh', '9444400007', 'Tirunelveli', 'Tenkasi', 'Near Court', 'Near Court', 'Drainage overflow near homes', '/uploads/TKT037.jpg', 'Sanitation Department', 'High', 87.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT038', 'Raghul', '9333300008', 'Kanyakumari', 'Marthandam', 'Main Road', 'Main Road', 'No water connection for 3 days', '/uploads/TKT038.jpg', 'Water Department', 'High', 91.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT039', 'Gayathri', '9222200009', 'Tiruppur', 'Dharapuram', 'Near Bus Stand', 'Near Bus Stand', 'Electric wires hanging dangerously', '/uploads/TKT039.jpg', 'Electricity Department', 'High', 96.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT040', 'Yogesh', '9111100010', 'Dharmapuri', 'Harur', 'Near Hospital', 'Near Hospital', 'Road completely damaged', '/uploads/TKT040.jpg', 'Road Department', 'High', 89.7, 'PENDING', '2026-05-22 18:45:42'),
('TKT041', 'Abinaya', '9000000011', 'Dindigul', 'Oddanchatram', 'Vegetable Market', 'Vegetable Market', 'Garbage smell affecting public', '/uploads/TKT041.jpg', 'Sanitation Department', 'Medium', 53.6, 'PENDING', '2026-05-22 18:45:42'),
('TKT042', 'Jeeva', '9888877712', 'Karur', 'Karur Town', 'Near Signal', 'Near Signal', 'Water supply interruption daily', '/uploads/TKT042.jpg', 'Water Department', 'Medium', 68.1, 'PENDING', '2026-05-22 18:45:42'),
('TKT043', 'Santhosh', '9777766613', 'Namakkal', 'Tiruchengode', 'Hill Road', 'Hill Road', 'Frequent transformer issues', '/uploads/TKT043.jpg', 'Electricity Department', 'Medium', 61.7, 'PENDING', '2026-05-22 18:45:42'),
('TKT044', 'Anu', '9666655514', 'Thoothukudi', 'Tuticorin', 'Harbour Area', 'Harbour Area', 'Road cracks causing bike accidents', '/uploads/TKT044.jpg', 'Road Department', 'High', 84.5, 'PENDING', '2026-05-22 18:45:42'),
('TKT045', 'Vikram', '9555544415', 'Vellore', 'Gudiyatham', 'Ward 2', 'Ward 2', 'Garbage scattered on roads', '/uploads/TKT045.jpg', 'Sanitation Department', 'Low', 45.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT046', 'Madhan', '9444433316', 'Cuddalore', 'Chidambaram', 'Temple Street', 'Temple Street', 'No clean drinking water available', '/uploads/TKT046.jpg', 'Water Department', 'High', 88.9, 'PENDING', '2026-05-22 18:45:42'),
('TKT047', 'Ishwarya', '9333322217', 'Villupuram', 'Villupuram Town', 'Near School', 'Near School', 'Street light issue for 1 month', '/uploads/TKT047.jpg', 'Electricity Department', 'Low', 48.4, 'PENDING', '2026-05-22 18:45:42'),
('TKT048', 'Ramesh', '9222211118', 'Nagapattinam', 'Velankanni', 'Beach Area', 'Beach Area', 'Road damaged due to rain', '/uploads/TKT048.jpg', 'Road Department', 'Medium', 69.8, 'PENDING', '2026-05-22 18:45:42'),
('TKT049', 'Shruthi', '9111100019', 'Krishnagiri', 'Denkanikottai', 'Near Bus Stop', 'Near Bus Stop', 'Drainage blockage issue', '/uploads/TKT049.jpg', 'Sanitation Department', 'Medium', 58.2, 'PENDING', '2026-05-22 18:45:42'),
('TKT050', 'Kishore', '9000099920', 'Ariyalur', 'Sendurai', 'Near Panchayat Office', 'Near Panchayat Office', 'Water tank leakage issue', '/uploads/TKT050.jpg', 'Water Department', 'Medium', 70.4, 'PENDING', '2026-05-22 18:45:42'),
('TKT-D88E9056', ',sfm', 'wmekwlkmewmek', 'Karur', 'Karur', 'ksk', 'ksk', 'kjjsf', NULL, 'Electricity Department', 'High', 74.79, 'PENDING', '2026-05-22 19:00:38'),
('TKT-C9F80812', 'kfsls', '8300299793', 'Madurai', 'Melur', 'kksdldaj', 'kksdldaj', 'kdksfj', NULL, 'Electricity Department', 'High', 73.17, 'PENDING', '2026-05-22 19:12:46');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
