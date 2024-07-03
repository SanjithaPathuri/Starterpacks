-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2018 at 02:15 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tollrace`
--

-- --------------------------------------------------------

--
-- Table structure for table `tollrace_contacts`
--

CREATE TABLE `tollrace_contacts` (
  `ContcatId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `Subject` text NOT NULL,
  `Message` text NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `toll_admin`
--

CREATE TABLE `toll_admin` (
  `AdminId` int(11) NOT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_admin`
--

INSERT INTO `toll_admin` (`AdminId`, `Email`, `Password`, `CreatedOn`) VALUES
(1, 'admin', '123456', '2018-02-15 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `toll_contacts`
--

CREATE TABLE `toll_contacts` (
  `ContactId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `Message` text NOT NULL,
  `createdon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_contacts`
--

INSERT INTO `toll_contacts` (`ContactId`, `Name`, `Email`, `Message`, `createdon`) VALUES
(1, 'Nagarjuna', 'nagarjuna@thesmartbridge.com', 'This is for test', '2018-02-16 06:33:27');

-- --------------------------------------------------------

--
-- Table structure for table `toll_fareamounts`
--

CREATE TABLE `toll_fareamounts` (
  `FareId` int(11) NOT NULL,
  `Vehicle_Type` text NOT NULL,
  `FareAmount` text NOT NULL,
  `Toll_Type` text NOT NULL,
  `TollgateName` text NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_fareamounts`
--

INSERT INTO `toll_fareamounts` (`FareId`, `Vehicle_Type`, `FareAmount`, `Toll_Type`, `TollgateName`, `Status`, `CreatedOn`) VALUES
(2, '2 - Wheeler', '50', 'Up - Fare', '1', 1, '2018-02-16 05:41:55'),
(3, '4 - Wheeler', '60', 'Up - Fare', '1', 1, '2018-02-16 05:42:06'),
(4, '8 - Wheeler', '70', 'Up - Fare', '1', 1, '2018-02-16 05:42:21'),
(5, '16 - Wheeler', '80', 'Up - Fare', '1', 1, '2018-02-16 05:44:08'),
(7, '2 - Wheeler', '90', 'Up & Down - Fare', '1', 1, '2018-02-16 05:45:01'),
(8, '4 - Wheeler', '110', 'Up & Down - Fare', '1', 1, '2018-02-16 05:45:32'),
(9, '8 - Wheeler', '130', 'Up & Down - Fare', '1', 1, '2018-02-16 05:45:49'),
(10, '16 - Wheeler', '150', 'Up & Down - Fare', '1', 0, '2018-02-16 05:46:07');

-- --------------------------------------------------------

--
-- Table structure for table `toll_tollgates`
--

CREATE TABLE `toll_tollgates` (
  `tollgateId` int(11) NOT NULL,
  `tollname` text NOT NULL,
  `tolllocation` text NOT NULL,
  `status` int(11) NOT NULL,
  `createdon` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_tollgates`
--

INSERT INTO `toll_tollgates` (`tollgateId`, `tollname`, `tolllocation`, `status`, `createdon`) VALUES
(1, 'Rajiv Gandhi Tollgates', 'Vijayawada,Highway road.', 1, '2018-02-15 05:08:33');

-- --------------------------------------------------------

--
-- Table structure for table `toll_tollmembers`
--

CREATE TABLE `toll_tollmembers` (
  `MemberId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `Mobile` text NOT NULL,
  `TollId` text NOT NULL,
  `Address` text NOT NULL,
  `Password` text NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_tollmembers`
--

INSERT INTO `toll_tollmembers` (`MemberId`, `Name`, `Email`, `Mobile`, `TollId`, `Address`, `Password`, `Status`, `CreatedOn`) VALUES
(1, 'Nagarjuna Madluri', 'nagarjuna@thesmartbridge.com', '9000195116', '1', 'H.no:16-55/1, Srkirishnagar, Dilsukhnagar, Hyderabad', '123456', 1, '2018-02-16 01:18:06');

-- --------------------------------------------------------

--
-- Table structure for table `toll_transactions`
--

CREATE TABLE `toll_transactions` (
  `TransactionId` int(11) NOT NULL,
  `TransactionNo` text NOT NULL,
  `UserId` text NOT NULL,
  `CardNo` text NOT NULL,
  `TollMemberId` text NOT NULL,
  `Amount` text NOT NULL,
  `TransactionStatus` text NOT NULL,
  `Transactiondate` text NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_transactions`
--

INSERT INTO `toll_transactions` (`TransactionId`, `TransactionNo`, `UserId`, `CardNo`, `TollMemberId`, `Amount`, `TransactionStatus`, `Transactiondate`, `CreatedOn`) VALUES
(1, '1518784174', '2', '1236', '1', '60', 'Success', '16 Feb 2018 05:59 pm', '2018-02-16 05:59:34'),
(2, '1518784194', '2', '1236', '1', '60', 'Success', '16 Feb 2018 05:59 pm', '2018-02-16 05:59:54'),
(3, '1518785549', '2', '1236', '1', '60', 'Success', '16 Feb 2018 06:22 pm', '2018-02-16 06:22:29');

-- --------------------------------------------------------

--
-- Table structure for table `toll_users`
--

CREATE TABLE `toll_users` (
  `UserId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `Mobile` text NOT NULL,
  `Address` text NOT NULL,
  `CardNo` text NOT NULL,
  `Password` text NOT NULL,
  `Amount` text NOT NULL,
  `Vehicle_Type` text NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toll_users`
--

INSERT INTO `toll_users` (`UserId`, `Name`, `Email`, `Mobile`, `Address`, `CardNo`, `Password`, `Amount`, `Vehicle_Type`, `Status`, `CreatedOn`) VALUES
(2, 'Nagarjuna Madluri', 'nagarjuna@thesmartbridge.com', '9000195116', 'Hyderabad', '1236', '123456', '30', '4 - Wheeler', 1, '2018-02-16 02:46:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tollrace_contacts`
--
ALTER TABLE `tollrace_contacts`
  ADD PRIMARY KEY (`ContcatId`);

--
-- Indexes for table `toll_admin`
--
ALTER TABLE `toll_admin`
  ADD PRIMARY KEY (`AdminId`);

--
-- Indexes for table `toll_contacts`
--
ALTER TABLE `toll_contacts`
  ADD PRIMARY KEY (`ContactId`);

--
-- Indexes for table `toll_fareamounts`
--
ALTER TABLE `toll_fareamounts`
  ADD PRIMARY KEY (`FareId`);

--
-- Indexes for table `toll_tollgates`
--
ALTER TABLE `toll_tollgates`
  ADD PRIMARY KEY (`tollgateId`);

--
-- Indexes for table `toll_tollmembers`
--
ALTER TABLE `toll_tollmembers`
  ADD PRIMARY KEY (`MemberId`);

--
-- Indexes for table `toll_transactions`
--
ALTER TABLE `toll_transactions`
  ADD PRIMARY KEY (`TransactionId`);

--
-- Indexes for table `toll_users`
--
ALTER TABLE `toll_users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tollrace_contacts`
--
ALTER TABLE `tollrace_contacts`
  MODIFY `ContcatId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `toll_admin`
--
ALTER TABLE `toll_admin`
  MODIFY `AdminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `toll_contacts`
--
ALTER TABLE `toll_contacts`
  MODIFY `ContactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `toll_fareamounts`
--
ALTER TABLE `toll_fareamounts`
  MODIFY `FareId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `toll_tollgates`
--
ALTER TABLE `toll_tollgates`
  MODIFY `tollgateId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `toll_tollmembers`
--
ALTER TABLE `toll_tollmembers`
  MODIFY `MemberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `toll_transactions`
--
ALTER TABLE `toll_transactions`
  MODIFY `TransactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `toll_users`
--
ALTER TABLE `toll_users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
