-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2018 at 04:16 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinebanking`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `Name` varchar(20) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Message` varchar(50) NOT NULL,
  `createdon` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`Name`, `Email`, `Message`, `createdon`) VALUES
('glen', 'glen@gmail.com', 'hello', '2018-04-05 07:15:07'),
('John', 'john@outlook.com', 'hi am john', '2018-04-05 07:20:22');

-- --------------------------------------------------------

--
-- Table structure for table `farmers_account`
--

CREATE TABLE `farmers_account` (
  `FarmersID` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `AdhaarNo` text NOT NULL,
  `AccountNo` text NOT NULL,
  `Mobile` text NOT NULL,
  `Address` text NOT NULL,
  `Password` text NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmers_account`
--

INSERT INTO `farmers_account` (`FarmersID`, `Name`, `Email`, `AdhaarNo`, `AccountNo`, `Mobile`, `Address`, `Password`, `Status`, `CreatedOn`) VALUES
(1, 'sanjitha', 'sanjithareddy.p@gmail.com', '12345678', '1521421121', '9959706297', 'Hyderabad', '123456', 1, '0000-00-00 00:00:00'),
(2, 'pujitha', '', '123456789', '1521453226', '9000195116', 'Hyderabad', '123456', 1, '0000-00-00 00:00:00'),
(3, 'harshitha', '', '1234567890', '1521462963', '734251788', 'hyd', '123456', 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `farmers_bank_cedentials`
--

CREATE TABLE `farmers_bank_cedentials` (
  `Id` int(11) NOT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmers_bank_cedentials`
--

INSERT INTO `farmers_bank_cedentials` (`Id`, `Email`, `Password`, `CreatedOn`) VALUES
(1, 'admin@bank.com', '123456', '2018-03-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `farmers_loans`
--

CREATE TABLE `farmers_loans` (
  `ID` int(11) NOT NULL,
  `farmerId` text NOT NULL,
  `ApplicationId` text NOT NULL,
  `LoanAmount` text NOT NULL,
  `AppliedStatus` text NOT NULL,
  `ApproveStatus` text NOT NULL,
  `AnalyticsSuggestion` text NOT NULL,
  `PaidAmount` text NOT NULL,
  `Status` text NOT NULL,
  `FormatedDate` text NOT NULL,
  `CreatedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmers_loans`
--

INSERT INTO `farmers_loans` (`ID`, `farmerId`, `ApplicationId`, `LoanAmount`, `AppliedStatus`, `ApproveStatus`, `AnalyticsSuggestion`, `PaidAmount`, `Status`, `FormatedDate`, `CreatedOn`) VALUES
(5, '1', '1521288755', '100000', '1', '3', '', '80000', '1', '17 Mar 2018 05:42 pm', '2018-03-17 05:42:35'),
(6, '1', '1521288757', '50000', '1', '2', '', '30000', '1', '17 Mar 2018 05:42 pm', '2018-03-17 05:42:37'),
(7, '1', '1521288759', '100000', '1', '3', '', '60000', '1', '17 Mar 2018 05:42 pm', '2018-03-17 05:42:39'),
(10, '2', '1521453400', '50000', '1', '3', '', '10', '1', '19 Mar 2018 03:26 pm', '2018-03-19 03:26:40'),
(11, '3', '1521462991', '', '1', '0', '', '', '1', '19 Mar 2018 06:06 pm', '2018-03-19 06:06:31'),
(16, '1', '1522137121', '', '1', '3', '', '', '1', '27 Mar 2018 01:22 pm', '2018-03-27 01:22:01'),
(17, '1', '1522933732', '', '1', '1', '', '', '1', '05 Apr 2018 06:38 pm', '2018-04-05 06:38:52'),
(21, '2', '1522936436', '', '1', '3', '', '', '1', '05 Apr 2018 07:23 pm', '2018-04-05 07:23:56'),
(22, '1', '1525597449', '', '1', '0', '', '', '1', '06 May 2018 02:34 pm', '2018-05-06 02:34:09'),
(23, '2', '1525691371', '', '1', '3', '', '', '1', '07 May 2018 04:39 pm', '2018-05-07 04:39:31'),
(24, '2', '1525691374', '', '1', '0', '', '', '1', '07 May 2018 04:39 pm', '2018-05-07 04:39:34'),
(25, '1', '1525691397', '', '1', '3', '', '', '1', '07 May 2018 04:39 pm', '2018-05-07 04:39:57'),
(26, '1', '1525691400', '', '1', '0', '', '', '1', '07 May 2018 04:40 pm', '2018-05-07 04:40:00'),
(27, '1', '1525698481', '', '1', '0', '', '', '1', '07 May 2018 06:38 pm', '2018-05-07 06:38:01'),
(28, '3', '1525698495', '', '1', '0', '', '', '1', '07 May 2018 06:38 pm', '2018-05-07 06:38:15'),
(29, '2', '1525783529', '', '1', '0', '', '', '1', '08 May 2018 06:15 pm', '2018-05-08 06:15:29'),
(30, '2', '1525783531', '', '1', '3', '', '', '1', '08 May 2018 06:15 pm', '2018-05-08 06:15:31'),
(31, '3', '1525783548', '', '1', '3', '', '', '1', '08 May 2018 06:15 pm', '2018-05-08 06:15:48'),
(32, '3', '1525783551', '', '1', '0', '', '', '1', '08 May 2018 06:15 pm', '2018-05-08 06:15:51'),
(33, '1', '1525783752', '', '1', '0', '', '', '1', '08 May 2018 06:19 pm', '2018-05-08 06:19:12'),
(34, '1', '1525783755', '', '1', '0', '', '', '1', '08 May 2018 06:19 pm', '2018-05-08 06:19:15'),
(35, '1', '1525856385', '', '1', '2', '', '', '1', '09 May 2018 02:29 pm', '2018-05-09 02:29:45');

-- --------------------------------------------------------

--
-- Table structure for table `sensordata`
--

CREATE TABLE `sensordata` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `temperature` varchar(10) NOT NULL,
  `humidity` varchar(10) NOT NULL,
  `soilmoisture` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `farmers_account`
--
ALTER TABLE `farmers_account`
  ADD PRIMARY KEY (`FarmersID`);

--
-- Indexes for table `farmers_bank_cedentials`
--
ALTER TABLE `farmers_bank_cedentials`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `farmers_loans`
--
ALTER TABLE `farmers_loans`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sensordata`
--
ALTER TABLE `sensordata`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `farmers_account`
--
ALTER TABLE `farmers_account`
  MODIFY `FarmersID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `farmers_bank_cedentials`
--
ALTER TABLE `farmers_bank_cedentials`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `farmers_loans`
--
ALTER TABLE `farmers_loans`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `sensordata`
--
ALTER TABLE `sensordata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
