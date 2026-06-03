/**
 * Carica i dati del portfolio nello stesso ordine dei tag <script> dell'index.html originale.
 * Ogni file e una IIFE che muta i globali window.__PORTFOLIO_*__ (side-effect import):
 *  1. portfolio-config.js  -> __PORTFOLIO_CONFIG__, patch layout, testi lunghi
 *  2. i 14 data.js          -> push su __PORTFOLIO_PROJECT_REGISTRY__
 *  3. projects-registry.js  -> costruisce __PORTFOLIO_PROJECTS__ e affini
 */
import "../../portfolio/portfolio-config.js";

import "../../portfolio/projects/ricerca-personale/florentina/data.js";
import "../../portfolio/projects/ricerca-personale/binge-drinking/data.js";
import "../../portfolio/projects/ricerca-personale/nude/data.js";
import "../../portfolio/projects/ricerca-personale/l-isola/data.js";
import "../../portfolio/projects/ricerca-personale/parigi/data.js";
import "../../portfolio/projects/ricerca-personale/taboo-shooting/data.js";
import "../../portfolio/projects/fotografia-di-moda/moda-shooting/data.js";
import "../../portfolio/projects/fotografia-di-moda/moda-jump/data.js";
import "../../portfolio/projects/fotografia-di-eventi/gallipoli-day/data.js";
import "../../portfolio/projects/fotografia-di-eventi/gallipoli-night/data.js";
import "../../portfolio/projects/fotografia-di-eventi/dj-set/data.js";
import "../../portfolio/projects/fotografia-di-eventi/concerti-ernia/data.js";
import "../../portfolio/projects/fotografia-di-eventi/laurea-ame/data.js";
import "../../portfolio/projects/fotografia-maternity/anca-edward/data.js";

import "../../portfolio/projects-registry.js";
