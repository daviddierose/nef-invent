-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2021 a las 22:27:25
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `colector`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `id` int(11) NOT NULL,
  `correlativo` int(11) NOT NULL,
  `codigo` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `codigos`
--

INSERT INTO `codigos` (`id`, `correlativo`, `codigo`, `cantidad`) VALUES
(21, 7, '00430000031-1E00138  ', 1),
(22, 7, '00430000031-1E00939  ', 1),
(23, 7, '00430000031-1E00538  ', 1),
(24, 7, '00430000031-1E08438  ', 1),
(25, 8, '00430000031-1E00138  ', 1),
(26, 8, '00430000031-1E00939  ', 1),
(27, 8, '00270000003-1E00835  ', 1),
(28, 8, '00270000006-1E00235  ', 1),
(29, 8, '00430000031-1E00538  ', 1),
(30, 8, '00430000031-1E00538  ', 1),
(31, 8, '00430000031-1E00538  ', 1),
(32, 8, '00430000031-1E00538  ', 1),
(33, 8, '00430000031-1E08438  ', 1),
(34, 8, '00430000031-1E08438  ', 1),
(35, 8, '00270000003-1E00135  ', 1),
(36, 8, '00270000003-1E00135  ', 1),
(37, 8, '00270000003-1E00135  ', 1),
(38, 8, '00270000006-1E00134  ', 1),
(39, 9, '7406272111483', 20),
(40, 9, '7406272123844', 11),
(41, 10, '7406272107417', 20),
(42, 10, '7406272104256', 20),
(43, 11, '00430000031-1E00138  ', 1),
(44, 11, '00430000031-1E00939  ', 1),
(45, 11, '00430000031-1E00538  ', 1),
(46, 11, '00430000031-1E08438  ', 1),
(47, 11, '00270000003-1E00135  ', 1),
(48, 11, '00270000003-1E00835  ', 1),
(49, 11, '00270000006-1E00134  ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_productos`
--

CREATE TABLE `codigos_productos` (
  `id` int(11) NOT NULL,
  `codigo` varchar(17) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `codigos_productos`
--

INSERT INTO `codigos_productos` (`id`, `codigo`) VALUES
(1, '00430000031-1E001'),
(2, '00430000031-1E009'),
(3, '00430000031-1E005'),
(4, '00430000031-1E084'),
(5, '00270000003-1E001'),
(6, '00270000003-1E008'),
(7, '00270000006-1E002'),
(8, '00270000006-1E001'),
(9, '7416202011417'),
(10, '7416202004044'),
(11, '7416202011424'),
(12, '7406272107417'),
(13, '9335051105703'),
(14, '7406272104256'),
(15, '7406272123844'),
(16, '7406272111483'),
(17, '00430000031-1E005'),
(18, '00430000031-1E009'),
(19, '00270000003-1E001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_registro`
--

CREATE TABLE `codigos_registro` (
  `id` int(11) NOT NULL,
  `codigo` varchar(16) COLLATE utf8mb4_spanish_ci NOT NULL,
  `status` int(1) NOT NULL,
  `code_device` varchar(16) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `codigos_registro`
--

INSERT INTO `codigos_registro` (`id`, `codigo`, `status`, `code_device`) VALUES
(100, '0000000000000000', 0, ''),
(101, 'qvZ8JkClyRgPW1bz', 1, 'w33NycqYPjFEJhHd'),
(102, 'd4DMRyLvQobKighO', 1, 'vqwiqcMeRxWCUGFe'),
(103, '6QbhSlH8Zf9TtEPi', 0, ''),
(104, 'g9SuGQlePLMJZRVh', 0, ''),
(105, 'BhTtSeuwmkxX7E5P', 0, ''),
(106, 'QCXVYRWPrTE7zvlw', 0, ''),
(107, 'L5UNayX6j90ATIwD', 0, ''),
(108, 'ck3o8Mb2xsR7pDrX', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colectores`
--

CREATE TABLE `colectores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,
  `status` int(1) NOT NULL,
  `codigo_registro` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `colectores`
--

INSERT INTO `colectores` (`id`, `nombre`, `status`, `codigo_registro`) VALUES
(1, 'colector 1', 1, 101),
(2, 'colector 2', 1, 102);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correlativo`
--

CREATE TABLE `correlativo` (
  `id` int(11) NOT NULL,
  `inventario` int(11) NOT NULL,
  `colector` int(11) NOT NULL,
  `fecha_ingreso` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL,
  `fecha_eliminado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `correlativo`
--

INSERT INTO `correlativo` (`id`, `inventario`, `colector`, `fecha_ingreso`, `status`, `fecha_eliminado`) VALUES
(1, 1, 1, '2021-11-01 22:44:21', 0, '2021-11-01 22:44:21'),
(2, 1, 1, '2021-11-01 22:47:37', 0, '2021-11-03 04:09:47'),
(3, 1, 1, '2021-11-01 22:50:49', 0, '2021-11-03 14:51:25'),
(4, 1, 1, '2021-11-01 22:54:49', 0, '2021-11-03 14:52:13'),
(5, 1, 1, '2021-11-01 22:55:25', 0, '2021-11-03 14:53:36'),
(6, 1, 1, '2021-11-02 20:11:28', 0, '2021-11-03 14:54:57'),
(7, 1, 1, '2021-11-03 15:09:38', 1, '2021-11-03 15:09:38'),
(8, 1, 1, '2021-11-03 15:11:24', 1, '2021-11-03 15:11:24'),
(9, 1, 1, '2021-11-03 15:40:11', 1, '2021-11-03 15:40:11'),
(10, 1, 1, '2021-11-03 15:41:38', 1, '2021-11-03 15:41:38'),
(11, 2, 1, '2021-11-03 15:44:02', 1, '2021-11-03 15:44:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` int(11) NOT NULL,
  `sucursal` int(11) NOT NULL,
  `fecha Inicio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha final` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `sucursal`, `fecha Inicio`, `fecha final`, `status`) VALUES
(1, 1, '2021-11-03 15:41:50', '0000-00-00 00:00:00', 0),
(2, 3, '2021-11-03 15:42:06', '2021-11-03 15:42:06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `option_config`
--

CREATE TABLE `option_config` (
  `id` int(11) NOT NULL,
  `configuración` text COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `option_config`
--

INSERT INTO `option_config` (`id`, `configuración`) VALUES
(1, 'Ingreso por Par'),
(2, 'Ingreso por Lote');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id`, `nombre`) VALUES
(1, 'Central'),
(2, 'Mayoreo'),
(3, 'Bodega'),
(4, 'Sucursal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `codigo_usuario` int(11) NOT NULL,
  `usuario` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(32) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`codigo_usuario`, `usuario`, `clave`) VALUES
(1, 'admin', '850faad8955c4afa3983ad9cff370117');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `correlativo-correlativo` (`correlativo`);

--
-- Indices de la tabla `codigos_productos`
--
ALTER TABLE `codigos_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `codigos_registro`
--
ALTER TABLE `codigos_registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colectores`
--
ALTER TABLE `colectores`
  ADD UNIQUE KEY `colector id` (`id`),
  ADD KEY `codigo_registro - codigo_registro` (`codigo_registro`);

--
-- Indices de la tabla `correlativo`
--
ALTER TABLE `correlativo`
  ADD UNIQUE KEY `correlativo` (`id`),
  ADD KEY `colector-correlativo` (`colector`),
  ADD KEY `inventario / inventario` (`inventario`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sucursal / sucursal` (`sucursal`);

--
-- Indices de la tabla `option_config`
--
ALTER TABLE `option_config`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`codigo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `codigos_productos`
--
ALTER TABLE `codigos_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `codigos_registro`
--
ALTER TABLE `codigos_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de la tabla `colectores`
--
ALTER TABLE `colectores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `correlativo`
--
ALTER TABLE `correlativo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `option_config`
--
ALTER TABLE `option_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `codigo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD CONSTRAINT `correlativo-correlativo` FOREIGN KEY (`correlativo`) REFERENCES `correlativo` (`id`);

--
-- Filtros para la tabla `colectores`
--
ALTER TABLE `colectores`
  ADD CONSTRAINT `codigo_registro - codigo_registro` FOREIGN KEY (`codigo_registro`) REFERENCES `codigos_registro` (`id`);

--
-- Filtros para la tabla `correlativo`
--
ALTER TABLE `correlativo`
  ADD CONSTRAINT `colector-correlativo` FOREIGN KEY (`colector`) REFERENCES `colectores` (`id`),
  ADD CONSTRAINT `inventario / inventario` FOREIGN KEY (`inventario`) REFERENCES `inventarios` (`id`);

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `sucursal / sucursal` FOREIGN KEY (`sucursal`) REFERENCES `sucursales` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
