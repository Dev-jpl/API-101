CREATE SCHEMA `apiDB`;
USE apiDB;
CREATE TABLE `users` (
	`user_id` VARCHAR(36) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`password` VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`username` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`contact_no` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`status` ENUM('0','1') NULL DEFAULT '1' COLLATE 'utf8mb4_general_ci',
	`created_at` TIMESTAMP NULL DEFAULT current_timestamp(),
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`user_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;