-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 10:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pssms`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `PlateNumber` varchar(255) NOT NULL,
  `DriverName` varchar(255) NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`PlateNumber`, `DriverName`, `PhoneNumber`, `createdAt`, `updatedAt`) VALUES
('RAA123B', 'Jean Paul', '+250788123456', '2025-05-23 08:31:09', '2025-05-23 08:31:09'),
('RAD012E', 'Marie Claire', '+250781234567', '2025-05-23 08:20:50', '2025-05-23 08:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `parkingrecords`
--

CREATE TABLE `parkingrecords` (
  `id` int(11) NOT NULL,
  `EntryTime` datetime NOT NULL,
  `ExitTime` datetime DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PlateNumber` varchar(255) DEFAULT NULL,
  `SlotNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parkingrecords`
--

INSERT INTO `parkingrecords` (`id`, `EntryTime`, `ExitTime`, `Duration`, `createdAt`, `updatedAt`, `PlateNumber`, `SlotNumber`) VALUES
(2, '2025-05-23 08:00:00', '2025-05-23 09:30:00', 90, '2025-05-23 08:31:11', '2025-05-23 08:31:11', 'RAA123B', 2),
(3, '2025-05-23 08:00:00', '2025-05-23 09:30:00', 90, '2025-05-23 08:31:47', '2025-05-23 08:31:47', 'RAD012E', 2);

-- --------------------------------------------------------

--
-- Table structure for table `parkingslots`
--

CREATE TABLE `parkingslots` (
  `SlotNumber` int(11) NOT NULL,
  `SlotStatus` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parkingslots`
--

INSERT INTO `parkingslots` (`SlotNumber`, `SlotStatus`, `createdAt`, `updatedAt`) VALUES
(1, 'Available', '2025-05-23 08:19:07', '2025-05-23 08:19:07'),
(2, 'Occupied', '2025-05-23 08:19:17', '2025-05-23 08:25:25'),
(5, 'Available', '2025-05-23 08:18:56', '2025-05-23 08:18:56'),
(8, 'Occupied', '2025-05-23 08:25:50', '2025-05-23 08:25:50');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `AmountPaid` decimal(10,2) NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ParkingRecordId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `AmountPaid`, `PaymentDate`, `createdAt`, `updatedAt`, `ParkingRecordId`) VALUES
(1, 1250.00, '2025-05-23 10:15:00', '2025-05-23 08:32:50', '2025-05-23 08:32:50', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`PlateNumber`);

--
-- Indexes for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PlateNumber` (`PlateNumber`),
  ADD KEY `SlotNumber` (`SlotNumber`);

--
-- Indexes for table `parkingslots`
--
ALTER TABLE `parkingslots`
  ADD PRIMARY KEY (`SlotNumber`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ParkingRecordId` (`ParkingRecordId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  ADD CONSTRAINT `parkingrecords_ibfk_1` FOREIGN KEY (`PlateNumber`) REFERENCES `cars` (`PlateNumber`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `parkingrecords_ibfk_2` FOREIGN KEY (`SlotNumber`) REFERENCES `parkingslots` (`SlotNumber`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`ParkingRecordId`) REFERENCES `parkingrecords` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
