CREATE TABLE `cidade` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`uf_id` integer NOT NULL,
	FOREIGN KEY (`uf_id`) REFERENCES `uf`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `noticia` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titulo` text NOT NULL,
	`texto` text NOT NULL,
	`cidade_id` integer NOT NULL,
	`data_criacao` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `uf` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`sigla` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uf_sigla_unique` ON `uf` (`sigla`);