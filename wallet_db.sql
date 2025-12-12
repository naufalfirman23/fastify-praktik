-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2025 at 01:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallet_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `beneficiaries`
--

CREATE TABLE `beneficiaries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `beneficiary_id` int(11) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `is_favorite` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merchant_details`
--

CREATE TABLE `merchant_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `store_category` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` enum('bank','ewallet','va','retail') NOT NULL,
  `code` varchar(20) NOT NULL,
  `fee_percent` decimal(5,2) DEFAULT 0.00,
  `fee_fixed` decimal(10,2) DEFAULT 0.00,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topups`
--

CREATE TABLE `topups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payment_code` varchar(50) NOT NULL,
  `status` enum('pending','paid','expired','failed') DEFAULT 'pending',
  `expires_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `trx_code` varchar(20) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `type` enum('transfer','topup','withdraw','payment') NOT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `fee` decimal(10,2) DEFAULT 0.00,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('user','merchant','admin') DEFAULT 'user',
  `id_card` varchar(50) DEFAULT NULL,
  `kyc_status` enum('pending','verified','rejected') DEFAULT 'pending',
  `balance` decimal(15,2) DEFAULT 0.00,
  `pin_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone`, `password`, `full_name`, `role`, `id_card`, `kyc_status`, `balance`, `pin_hash`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'umronganteng', 'temooon@gmail.com', '', '$2b$10$chqazLLpToosoJpxo1NlOOrNNpUsy3dHFP1.c8tYsMsMf8MjDbQdm', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 06:00:07', '2025-12-08 06:00:07'),
(4, 'umronganteng', 'temon@gmail.com', '08655621633', '$2b$10$OpvDajhFtjgYeytgK.GbUuk.wCQ5wVm7kImBDUHMFQK5M1I7V4JfS', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 07:59:48', '2025-12-08 07:59:48'),
(5, 'umronganteng', 'temon1@gmail.com', '08655621631', '$2b$10$sU8g0CJ677Gw/wbUlhgG4.LouCOPbYS5AnwcoJtL8Pq/HUFfrU8K6', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 08:01:45', '2025-12-08 08:01:45'),
(6, 'umronganteng', 'temon2@gmail.com', '08655621621', '$2b$10$Jhjr.X7NA.uCJNOIiZ0B1uNdlr3XtiGYCKIwYX/dw0Y.eX.fXuodG', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 08:06:36', '2025-12-08 08:06:36'),
(7, 'umronganteng', 'temon22@gmail.com', '08655621622', '$2b$10$TYZIbBrYFExK3gHJZA.aLe7vbSi6eu83U1Gm3hwZ9sPOyj9w7M8KG', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 10:32:30', '2025-12-08 10:32:30'),
(8, 'umronganteng', 'temon222@gmail.com', '086556216222', '$2b$10$YWy.3SVvVghQy0BjAHj0FumIHoeXlmzH3azAOW3Fn4ItApuxmRW9O', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 10:33:46', '2025-12-08 10:33:46'),
(9, 'umronganteng', 'temon2212@gmail.com', '0865562162212', '$2b$10$OSQhXOnOTRt9yklXr0A1/uEzpluP4UUcAqGoKVvcmDXPdGpCNb3ka', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 10:35:33', '2025-12-08 10:35:33'),
(10, 'umronganteng', 'temon12@gmail.com', '065562162212', '$2b$10$uAEz70oLFngs3Ul.6KIhtuB//t3Ce.8TfCpCifjXfY2Ao80fJlRbO', '', 'user', NULL, 'pending', 0.00, '', 1, '2025-12-08 12:03:45', '2025-12-08 12:03:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_beneficiary` (`user_id`,`beneficiary_id`),
  ADD KEY `beneficiary_id` (`beneficiary_id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_favorite` (`user_id`,`is_favorite`);

--
-- Indexes for table `merchant_details`
--
ALTER TABLE `merchant_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `idx_store_name` (`store_name`),
  ADD KEY `idx_verified` (`is_verified`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_code` (`code`);

--
-- Indexes for table `topups`
--
ALTER TABLE `topups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_code` (`payment_code`),
  ADD KEY `payment_method_id` (`payment_method_id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_payment_code` (`payment_code`),
  ADD KEY `idx_expires` (`expires_at`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `trx_code` (`trx_code`),
  ADD KEY `idx_trx_code` (`trx_code`),
  ADD KEY `idx_sender` (`sender_id`),
  ADD KEY `idx_receiver` (`receiver_id`),
  ADD KEY `idx_created` (`created_at`),
  ADD KEY `idx_status_type` (`status`,`type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `id_card` (`id_card`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_phone` (`phone`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_status` (`kyc_status`,`is_active`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merchant_details`
--
ALTER TABLE `merchant_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topups`
--
ALTER TABLE `topups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD CONSTRAINT `beneficiaries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beneficiaries_ibfk_2` FOREIGN KEY (`beneficiary_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `merchant_details`
--
ALTER TABLE `merchant_details`
  ADD CONSTRAINT `merchant_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `topups`
--
ALTER TABLE `topups`
  ADD CONSTRAINT `topups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `topups_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
