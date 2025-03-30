CREATE SCHEMA IF NOT EXISTS `projeto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `projeto`;

CREATE TABLE IF NOT EXISTS `projeto`.`escolas` (
  `idEscola` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `nomeEscola` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idEscola`),
  UNIQUE INDEX `id_escola_UNIQUE` (`idEscola` ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projeto`.`professores` (
  `idProfessor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeProfessor` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `especialidade` VARCHAR(255) NOT NULL,
  `escolas_idEscola` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idProfessor`),
  UNIQUE INDEX `id_prof_UNIQUE` (`idProfessor` ASC),
  INDEX `fk_professores_escolas1_idx` (`escolas_idEscola` ASC),
  CONSTRAINT `fk_professores_escolas1`
    FOREIGN KEY (`escolas_idEscola`)
    REFERENCES `projeto`.`escolas` (`idEscola`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projeto`.`turmas` (
  `idTurma` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `serie` VARCHAR(64) NOT NULL,
  `quantiaAlunos` INT NOT NULL,
  `cursoTecnico` VARCHAR(64) NOT NULL,
  `professores_idProf` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idTurma`),
  UNIQUE INDEX `id_turma_UNIQUE` (`idTurma` ASC),
  INDEX `fk_turmas_professores_idx` (`professores_idProf` ASC),
  CONSTRAINT `fk_turmas_professores`
    FOREIGN KEY (`professores_idProf`)
    REFERENCES `projeto`.`professores` (`idProfessor`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
