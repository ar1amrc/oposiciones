/*
 Navicat Premium Data Transfer

 Source Server         : oposiciones
 Source Server Type    : SQLite
 Source Server Version : 3035005
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3035005
 File Encoding         : 65001

 Date: 12/09/2023 22:55:42
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT,
  "correctas" integer,
  "fallidas" integer,
  "porciento" TEXT,
  "random" tinyint,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "user" VALUES (1, 'dsadas', 12, 12, '502', 1);

PRAGMA foreign_keys = true;
