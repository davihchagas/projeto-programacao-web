CREATE TABLE `noticia_tag` (
	`noticia_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`noticia_id`, `tag_id`),
	FOREIGN KEY (`noticia_id`) REFERENCES `noticia`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tag_nome_unique` ON `tag` (`nome`);