drop schema if exists devMedia;

create schema devMedia;

use devMedia;

create table `category`(
	`id` int primary key auto_increment,
    `name`varchar(50) not null unique
);

create table `news`(
	`id` int primary key auto_increment,
    `title` varchar(50) not null,
    `content` text not null,
    `category_name` varchar(50) not null,
    foreign key (`category_name`) references `category`(`name`)
);