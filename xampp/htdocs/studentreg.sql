-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2017 at 05:27 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookings`
--

-- --------------------------------------------------------

--
-- Table structure for table `studentreg`
--

CREATE TABLE `studentreg` (
  `StudRollNum` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL,
  `Age` int(10) NOT NULL,
  `Gender` varchar(7) NOT NULL,
  `FamIncome` int(10) NOT NULL,
  `NumOfSib` int(10) NOT NULL,
  `OrderOfBirth` int(10) NOT NULL,
  `ParentEdLevel` varchar(30) NOT NULL,
  `ParentalStatus` varchar(30) NOT NULL,
  `FamilyType` varchar(30) NOT NULL,
  `Class` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='i hate this table';

--
-- Dumping data for table `studentreg`
--

INSERT INTO `studentreg` (`StudRollNum`, `name`, `Age`, `Gender`, `FamIncome`, `NumOfSib`, `OrderOfBirth`, `ParentEdLevel`, `ParentalStatus`, `FamilyType`, `Class`) VALUES
('LC20170001', 'Drake', 8, 'Male', 100000, 1, 2, 'Btech', 'married', 'Joint', 3),
('LC20170001', 'Drake', 8, 'Male', 100000, 1, 2, 'Btech', 'married', 'Joint', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
