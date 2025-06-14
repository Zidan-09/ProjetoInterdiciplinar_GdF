SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema interproject
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema interproject
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `interproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `interproject` ;

-- -----------------------------------------------------
-- Table `interproject`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`employee` ;

CREATE TABLE IF NOT EXISTS `interproject`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `registrationNumber` INT NULL DEFAULT NULL,
  `name` VARCHAR(100) NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `dob` DATETIME NOT NULL,
  `address` TEXT NOT NULL,
  `hireDate` DATETIME NOT NULL,
  `workShift` ENUM('morning', 'afternoon', 'night', 'full-time') NULL DEFAULT NULL,
  `status` ENUM('active', 'onLeave', 'Resigned') NULL DEFAULT NULL,
  `salary` DECIMAL(10,2) NULL DEFAULT NULL,
  `cnesCode` CHAR(10) NOT NULL,
  `weeklyHours` INT NULL DEFAULT NULL,
  `accessLevel` ENUM('admin', 'nurse', 'doctor', 'receptionist') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`admin` ;

CREATE TABLE IF NOT EXISTS `interproject`.`admin` (
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admin_ibfk_1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `interproject`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`receptionist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`receptionist` ;

CREATE TABLE IF NOT EXISTS `interproject`.`receptionist` (
  `recep_id` INT NOT NULL,
  PRIMARY KEY (`recep_id`),
  CONSTRAINT `receptionist_ibfk_1`
    FOREIGN KEY (`recep_id`)
    REFERENCES `interproject`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`patient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`patient` ;

CREATE TABLE IF NOT EXISTS `interproject`.`patient` (
  `pat_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `dob` DATETIME NOT NULL,
  `maritalStatus` ENUM('single', 'married', 'divorced', 'separeted', 'widowed') NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `rg` CHAR(7) NOT NULL,
  `contact` VARCHAR(15) NOT NULL,
  `gender` ENUM('male', 'female', 'other') NOT NULL,
  `healthPlan` VARCHAR(50) NULL DEFAULT NULL,
  `address` TEXT NOT NULL,
  PRIMARY KEY (`pat_id`),
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`careflow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`careflow` ;

CREATE TABLE IF NOT EXISTS `interproject`.`careflow` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `receptionist_id` INT NOT NULL,
  `patient_id` INT NOT NULL,
  `checkInHospital` TIMESTAMP NOT NULL,
  `status` ENUM('waiting_triage', 'waiting_consultation', 'in_consult', 'in_triage', 'attended', 'no_show') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `receptionist_id` (`receptionist_id` ASC) VISIBLE,
  INDEX `careflow_ibfk_2` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `careflow_ibfk_1`
    FOREIGN KEY (`receptionist_id`)
    REFERENCES `interproject`.`receptionist` (`recep_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `careflow_ibfk_2`
    FOREIGN KEY (`patient_id`)
    REFERENCES `interproject`.`patient` (`pat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`doctor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`doctor` ;

CREATE TABLE IF NOT EXISTS `interproject`.`doctor` (
  `doc_id` INT NOT NULL,
  `crm` CHAR(10) NOT NULL,
  `specialty` VARCHAR(20) NOT NULL,
  `onDuty` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`doc_id`),
  UNIQUE INDEX `specialty` (`specialty` ASC) VISIBLE,
  CONSTRAINT `doctor_ibfk_1`
    FOREIGN KEY (`doc_id`)
    REFERENCES `interproject`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`consult`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`consult` ;

CREATE TABLE IF NOT EXISTS `interproject`.`consult` (
  `consult_id` INT NOT NULL,
  `doctor_id` INT NOT NULL,
  `checkInConsult` TIMESTAMP NOT NULL,
  `checkOutConsult` TIMESTAMP NULL DEFAULT NULL,
  `diagnosis` VARCHAR(100) NULL DEFAULT NULL,
  `prescriptions` VARCHAR(100) NULL DEFAULT NULL,
  `notes` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`consult_id`),
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  CONSTRAINT `consult_ibfk_1`
    FOREIGN KEY (`consult_id`)
    REFERENCES `interproject`.`careflow` (`id`),
  CONSTRAINT `consult_ibfk_2`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `interproject`.`doctor` (`doc_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`nurse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`nurse` ;

CREATE TABLE IF NOT EXISTS `interproject`.`nurse` (
  `nur_id` INT NOT NULL,
  `coren` VARCHAR(20) NOT NULL,
  `department` VARCHAR(50) NOT NULL,
  `specialty` VARCHAR(20) NOT NULL,
  `onDuty` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`nur_id`),
  UNIQUE INDEX `coren` (`coren` ASC) VISIBLE,
  UNIQUE INDEX `specialty` (`specialty` ASC) VISIBLE,
  CONSTRAINT `nurse_ibfk_1`
    FOREIGN KEY (`nur_id`)
    REFERENCES `interproject`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`triagecategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`triagecategory` ;

CREATE TABLE IF NOT EXISTS `interproject`.`triagecategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `color` VARCHAR(20) NOT NULL,
  `limitDate` INT NOT NULL,
  `priority` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `color` (`color` ASC) VISIBLE,
  UNIQUE INDEX `priority` (`priority` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`triage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`triage` ;

CREATE TABLE IF NOT EXISTS `interproject`.`triage` (
  `triage_id` INT NOT NULL,
  `nurse_id` INT NOT NULL,
  `checkInTriage` TIMESTAMP NOT NULL,
  `checkOutTriage` TIMESTAMP NULL DEFAULT NULL,
  `systolicPressure` INT NULL DEFAULT NULL,
  `diastolicPressure` INT NULL DEFAULT NULL,
  `heartRate` INT NULL DEFAULT NULL,
  `respiratoryRate` INT NULL DEFAULT NULL,
  `bodyTemperature` INT NULL DEFAULT NULL,
  `oxygenSaturation` INT NULL DEFAULT NULL,
  `painLevel` INT NULL DEFAULT NULL,
  `symptoms` TEXT NULL DEFAULT NULL,
  `triageCategory_id` INT NOT NULL,
  INDEX `nurse_id` (`nurse_id` ASC) VISIBLE,
  INDEX `triage_ibfk_3` (`triageCategory_id` ASC) VISIBLE,
  PRIMARY KEY (`triage_id`),
  CONSTRAINT `triage_ibfk_1`
    FOREIGN KEY (`triage_id`)
    REFERENCES `interproject`.`careflow` (`id`),
  CONSTRAINT `triage_ibfk_2`
    FOREIGN KEY (`nurse_id`)
    REFERENCES `interproject`.`nurse` (`nur_id`),
  CONSTRAINT `triage_ibfk_3`
    FOREIGN KEY (`triageCategory_id`)
    REFERENCES `interproject`.`triagecategory` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interproject`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `interproject`.`user` ;

CREATE TABLE IF NOT EXISTS `interproject`.`user` (
  `user_id` INT NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `interproject`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;