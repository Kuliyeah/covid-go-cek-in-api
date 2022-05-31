-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2022 at 03:46 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covidcheckin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(10) NOT NULL,
  `namaAdmin` varchar(50) NOT NULL,
  `usernameAdmin` varchar(20) NOT NULL,
  `passwordAdmin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`idAdmin`, `namaAdmin`, `usernameAdmin`, `passwordAdmin`) VALUES
(1, 'Lovanto', 'admin', '$2y$10$hRi1qju2KOeEPcBZ0wYfhu/PN5e9Wl.ddWeDTds8Uokad764X9D1a');

-- --------------------------------------------------------

--
-- Table structure for table `kunjungan`
--

CREATE TABLE `kunjungan` (
  `idKunjungan` int(100) NOT NULL,
  `idPengunjung` int(10) NOT NULL,
  `idMitra` int(10) NOT NULL,
  `tanggal` varchar(255) NOT NULL,
  `checkin` varchar(255) NOT NULL,
  `checkout` varchar(255) NOT NULL,
  `statusKunjungan` enum('Selesai','Dalam Kunjungan') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kunjungan`
--

INSERT INTO `kunjungan` (`idKunjungan`, `idPengunjung`, `idMitra`, `tanggal`, `checkin`, `checkout`, `statusKunjungan`) VALUES
(7, 9, 2, '19-09-2021', 'Yes', 'Yes', 'Selesai'),
(8, 9, 4, '29-09-2021', 'Yes', 'Yes', 'Dalam Kunjungan'),
(9, 10, 3, '11-09-2021', 'Yes', 'No', 'Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `mitra`
--

CREATE TABLE `mitra` (
  `idMitra` int(10) NOT NULL,
  `namaMitra` varchar(50) NOT NULL,
  `alamatMitra` varchar(255) NOT NULL,
  `noHpMitra` varchar(15) NOT NULL,
  `jenisUsaha` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `fotoUsaha` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Belum Verifikasi'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mitra`
--

INSERT INTO `mitra` (`idMitra`, `namaMitra`, `alamatMitra`, `noHpMitra`, `jenisUsaha`, `deskripsi`, `fotoUsaha`, `status`) VALUES
(1, 'Lasco Kaffe', 'Jl. Buah Batu No.54, Burangrang, Kec. Lengkong, Kota Bandung, Jawa Barat 402621', '08210000001', 'Kaffe1', 'Kaffe1', '', 'Sudah Verifikasi'),
(2, 'Telyu Coffee', 'Lingkungan Telkom University, Bandung, Indonesia', '088131434225', 'Kaffe', 'Menjual aneka minuman mahasiswa', '', 'Belum Verifikasi'),
(3, 'Lotte Mart', 'Jl. Trans Sumatera, Lampung', '08219999990', 'Modern Market', 'Tempat grosir termurah', '', 'Belum Verifikasi'),
(4, 'Transmart Bubat', 'Terusan Buah Batu, Bandung', '08222909900', 'Modern market dan tempat hiburan', 'tempat hiburan keluarga dan penjualan', '', 'Sudah Verifikasi');

-- --------------------------------------------------------

--
-- Table structure for table `pengunjung`
--

CREATE TABLE `pengunjung` (
  `idPengunjung` int(10) NOT NULL,
  `usernamePengunjung` varchar(50) NOT NULL,
  `passwordPengunjung` varchar(50) NOT NULL,
  `nikPengunjung` varchar(16) NOT NULL,
  `namaPengunjung` varchar(50) NOT NULL,
  `alamatPengunjung` varchar(255) NOT NULL,
  `noHpPengunjung` varchar(15) NOT NULL,
  `umurPengunjung` int(3) NOT NULL,
  `jenisKelaminPengunjung` enum('Pria','Wanita') NOT NULL,
  `statusKesehatan` enum('Negatif','Positif','ODP','OTG') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengunjung`
--

INSERT INTO `pengunjung` (`idPengunjung`, `usernamePengunjung`, `passwordPengunjung`, `nikPengunjung`, `namaPengunjung`, `alamatPengunjung`, `noHpPengunjung`, `umurPengunjung`, `jenisKelaminPengunjung`, `statusKesehatan`) VALUES
(9, 'lovanto2', 'fda890869b33164fe9d02dbab35348b9', '1234567890123456', 'Rifky Lovanto', 'Jl. Telekomunikasi no.1 terusan buah batu, asrama putra telkom university gedung 9 kamar 218', '087823837566', 20, 'Pria', 'Negatif'),
(10, 'rifky55', '2cc5ebcb8ede862636b4e2d4fe59f9b9', '1234567890123456', 'Rifky Lovantoss', 'dddddd', '087823837566', 0, 'Pria', 'Negatif'),
(11, 'lovanto', '202cb962ac59075b964b07152d234b70', '3938193', 'wadawdawdawda', 'awdawdawd w d awdwd awd awdwa daw dwa dawd aw dad awdwa w wd wda', '0389', 0, 'Wanita', 'Negatif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indexes for table `kunjungan`
--
ALTER TABLE `kunjungan`
  ADD PRIMARY KEY (`idKunjungan`),
  ADD KEY `fk_idPengunjung` (`idPengunjung`),
  ADD KEY `fk_idMitra` (`idMitra`);

--
-- Indexes for table `mitra`
--
ALTER TABLE `mitra`
  ADD PRIMARY KEY (`idMitra`);

--
-- Indexes for table `pengunjung`
--
ALTER TABLE `pengunjung`
  ADD PRIMARY KEY (`idPengunjung`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kunjungan`
--
ALTER TABLE `kunjungan`
  MODIFY `idKunjungan` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `mitra`
--
ALTER TABLE `mitra`
  MODIFY `idMitra` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pengunjung`
--
ALTER TABLE `pengunjung`
  MODIFY `idPengunjung` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kunjungan`
--
ALTER TABLE `kunjungan`
  ADD CONSTRAINT `fk_idMitra` FOREIGN KEY (`idMitra`) REFERENCES `mitra` (`idMitra`),
  ADD CONSTRAINT `fk_idPengunjung` FOREIGN KEY (`idPengunjung`) REFERENCES `pengunjung` (`idPengunjung`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
