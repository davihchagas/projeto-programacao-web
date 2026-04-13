PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cidade` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`uf_id` integer NOT NULL,
	FOREIGN KEY (`uf_id`) REFERENCES `uf`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cidade`("id", "nome", "uf_id") SELECT "id", "nome", "uf_id" FROM `cidade`;--> statement-breakpoint
DROP TABLE `cidade`;--> statement-breakpoint
ALTER TABLE `__new_cidade` RENAME TO `cidade`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_noticia` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titulo` text NOT NULL,
	`texto` text NOT NULL,
	`cidade_id` integer NOT NULL,
	`data_criacao` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_noticia`("id", "titulo", "texto", "cidade_id", "data_criacao") SELECT "id", "titulo", "texto", "cidade_id", "data_criacao" FROM `noticia`;--> statement-breakpoint
DROP TABLE `noticia`;--> statement-breakpoint
ALTER TABLE `__new_noticia` RENAME TO `noticia`;