-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2022 a las 14:10:37
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facturadordb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company_entity`
--

CREATE TABLE `company_entity` (
  `name` varchar(444) DEFAULT '',
  `address` varchar(4444) DEFAULT '',
  `cif` varchar(9) DEFAULT '',
  `iban` varchar(44) DEFAULT '',
  `companyId` int(11) NOT NULL,
  `userIdUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `company_entity`
--

INSERT INTO `company_entity` (`name`, `address`, `cif`, `iban`, `companyId`, `userIdUserId`) VALUES
('Jose Co', 'Calle Emiliano Barral', 'B00000000', 'ES76 2100 5485 6698 4555', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concept_entity`
--

CREATE TABLE `concept_entity` (
  `concept` varchar(4444) DEFAULT '',
  `amount` int(11) DEFAULT 0,
  `conceptId` int(11) NOT NULL,
  `invoiceIdInvoiceId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `concept_entity`
--

INSERT INTO `concept_entity` (`concept`, `amount`, `conceptId`, `invoiceIdInvoiceId`) VALUES
('Concepto Prueba', 100, 1, 1),
('Concepto Primero', 100, 2, 2),
('Concepto Segundo', 50, 3, 2),
('Prueba', 100, 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer_entity`
--

CREATE TABLE `customer_entity` (
  `name` varchar(444) DEFAULT '',
  `email` varchar(444) DEFAULT '',
  `contact` varchar(444) DEFAULT '',
  `phone` varchar(444) DEFAULT '',
  `address` varchar(444) DEFAULT '',
  `cif` varchar(9) DEFAULT '',
  `remarks` varchar(4444) DEFAULT '',
  `customerId` int(11) NOT NULL,
  `userIdUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `customer_entity`
--

INSERT INTO `customer_entity` (`name`, `email`, `contact`, `phone`, `address`, `cif`, `remarks`, `customerId`, `userIdUserId`) VALUES
('Mensoft Consultores', 'jlpastor@mensoft.es', 'Jose Luis Pastor', '606890568', 'Calle Gamonal', 'C08756895', 'Empresa de consultoría informática.', 1, 1),
('U-Tad', 'utad@utad.com', 'Ivan Alexis Abad', '635895874', 'Calle Playa de Liencres, 2 bis. – Parque Europa Empresarial', 'F06585684', '', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice_entity`
--

CREATE TABLE `invoice_entity` (
  `date` datetime NOT NULL,
  `remarks` varchar(4444) DEFAULT '',
  `collected` tinyint(4) DEFAULT 0,
  `collectionDate` datetime DEFAULT NULL,
  `taxableIncome` int(11) DEFAULT 0,
  `totalAmount` int(11) DEFAULT 0,
  `invoiceId` int(11) NOT NULL,
  `customerIdCustomerId` int(11) DEFAULT NULL,
  `userIdUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `invoice_entity`
--

INSERT INTO `invoice_entity` (`date`, `remarks`, `collected`, `collectionDate`, `taxableIncome`, `totalAmount`, `invoiceId`, `customerIdCustomerId`, `userIdUserId`) VALUES
('2022-06-20 12:18:04', 'Sin comentarios.', 0, NULL, 21, 121, 1, 1, 1),
('2022-06-20 12:18:51', 'Cobrar pasadas dos semanas como máximo.', 1, '2022-06-20 12:54:32', 21, 182, 2, 2, 1),
('2022-06-20 12:54:07', 'sin comentarios.', 0, NULL, 19, 119, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_entity`
--

CREATE TABLE `user_entity` (
  `email` varchar(444) NOT NULL,
  `password` varchar(444) NOT NULL,
  `name` varchar(444) DEFAULT '',
  `phone` varchar(444) DEFAULT '',
  `recoveryCode` varchar(10) DEFAULT '',
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_entity`
--

INSERT INTO `user_entity` (`email`, `password`, `name`, `phone`, `recoveryCode`, `userId`) VALUES
('jose.pastor@live.u-tad.com', '$2b$10$eE22O4s3fo2HdPk8LLa1COJ4R/pyGWnLK4uShSo6r.d/YrZ5z/wvW', 'Jose Luis Pastor Sierr', '606890568', '', 1),
('j@p.es', '$2b$10$ydpFO4aWTEYNzMpLpSu7KuD5/yXsOqOo3QeFSP.Ep8bpeVBb5VhkG', 'Jose', '600000000', '', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `company_entity`
--
ALTER TABLE `company_entity`
  ADD PRIMARY KEY (`companyId`),
  ADD UNIQUE KEY `REL_23adbc781a74a1cebcc462ba6a` (`userIdUserId`);

--
-- Indices de la tabla `concept_entity`
--
ALTER TABLE `concept_entity`
  ADD PRIMARY KEY (`conceptId`),
  ADD KEY `FK_3e155f543a291406a6225ce37dd` (`invoiceIdInvoiceId`);

--
-- Indices de la tabla `customer_entity`
--
ALTER TABLE `customer_entity`
  ADD PRIMARY KEY (`customerId`),
  ADD KEY `FK_4c580fb26f81b051f9cfad3fa59` (`userIdUserId`);

--
-- Indices de la tabla `invoice_entity`
--
ALTER TABLE `invoice_entity`
  ADD PRIMARY KEY (`invoiceId`),
  ADD KEY `FK_ba0dc0a7f7ccea16ed7725f93c2` (`customerIdCustomerId`),
  ADD KEY `FK_234fc9e48ace366eb08d62091f3` (`userIdUserId`);

--
-- Indices de la tabla `user_entity`
--
ALTER TABLE `user_entity`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `IDX_415c35b9b3b6fe45a3b065030f` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `company_entity`
--
ALTER TABLE `company_entity`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `concept_entity`
--
ALTER TABLE `concept_entity`
  MODIFY `conceptId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `customer_entity`
--
ALTER TABLE `customer_entity`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `invoice_entity`
--
ALTER TABLE `invoice_entity`
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_entity`
--
ALTER TABLE `user_entity`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `company_entity`
--
ALTER TABLE `company_entity`
  ADD CONSTRAINT `FK_23adbc781a74a1cebcc462ba6a4` FOREIGN KEY (`userIdUserId`) REFERENCES `user_entity` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `concept_entity`
--
ALTER TABLE `concept_entity`
  ADD CONSTRAINT `FK_3e155f543a291406a6225ce37dd` FOREIGN KEY (`invoiceIdInvoiceId`) REFERENCES `invoice_entity` (`invoiceId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `customer_entity`
--
ALTER TABLE `customer_entity`
  ADD CONSTRAINT `FK_4c580fb26f81b051f9cfad3fa59` FOREIGN KEY (`userIdUserId`) REFERENCES `user_entity` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `invoice_entity`
--
ALTER TABLE `invoice_entity`
  ADD CONSTRAINT `FK_234fc9e48ace366eb08d62091f3` FOREIGN KEY (`userIdUserId`) REFERENCES `user_entity` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ba0dc0a7f7ccea16ed7725f93c2` FOREIGN KEY (`customerIdCustomerId`) REFERENCES `customer_entity` (`customerId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
