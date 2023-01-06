--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2023-01-06 23:13:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 28288)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id integer NOT NULL,
    username character varying(100),
    password character varying(100),
    email character varying(100),
    external_id character varying(100),
    is_activated boolean,
    provider character varying(100)
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 28293)
-- Name: Account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.account ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Account_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 28294)
-- Name: account_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_group (
    id integer NOT NULL,
    group_id integer NOT NULL,
    account_id integer NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.account_group OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 28297)
-- Name: account_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.account_group ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.account_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 28355)
-- Name: account_presentation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_presentation (
    id integer NOT NULL,
    account_id integer NOT NULL,
    presentation_id integer NOT NULL,
    role integer
);


ALTER TABLE public.account_presentation OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 28358)
-- Name: account_presentation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.account_presentation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.account_presentation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 28298)
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(100),
    invitation_link character varying(200) NOT NULL
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 28301)
-- Name: group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."group" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 28302)
-- Name: presentation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.presentation (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    slide_count integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    group_id integer,
    chats text,
    questions text
);


ALTER TABLE public.presentation OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 28306)
-- Name: presentation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.presentation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.presentation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 28307)
-- Name: slide; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slide (
    id integer NOT NULL,
    slide_type_id integer NOT NULL,
    presentation_id integer NOT NULL,
    content text NOT NULL,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.slide OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 28313)
-- Name: slide_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.slide ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.slide_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 28314)
-- Name: slide_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slide_type (
    id integer NOT NULL,
    name character varying(200) NOT NULL
);


ALTER TABLE public.slide_type OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 28317)
-- Name: slide_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.slide_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.slide_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3355 (class 0 OID 28288)
-- Dependencies: 209
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account (id, username, password, email, external_id, is_activated, provider) OVERRIDING SYSTEM VALUE VALUES (6, 'Thới Hải Đức', NULL, 'haiduc0147@gmail.com', '101224525184439385427', true, 'google');
INSERT INTO public.account (id, username, password, email, external_id, is_activated, provider) OVERRIDING SYSTEM VALUE VALUES (7, 'admin', '$2a$10$oL87ku4YXcnAlu5lKACwUeBAyXaOI2w5oAgceZMwkP0HFb9bswbGy', 'Haiduc0147@gmail.com', NULL, true, 'local');


--
-- TOC entry 3357 (class 0 OID 28294)
-- Dependencies: 211
-- Data for Name: account_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (17, 11, 6, 1);
INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (16, 10, 7, 2);


--
-- TOC entry 3367 (class 0 OID 28355)
-- Dependencies: 221
-- Data for Name: account_presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_presentation (id, account_id, presentation_id, role) OVERRIDING SYSTEM VALUE VALUES (1, 6, 8, 1);
INSERT INTO public.account_presentation (id, account_id, presentation_id, role) OVERRIDING SYSTEM VALUE VALUES (4, 7, 8, 2);
INSERT INTO public.account_presentation (id, account_id, presentation_id, role) OVERRIDING SYSTEM VALUE VALUES (5, 6, 7, 2);
INSERT INTO public.account_presentation (id, account_id, presentation_id, role) OVERRIDING SYSTEM VALUE VALUES (3, 7, 7, 1);
INSERT INTO public.account_presentation (id, account_id, presentation_id, role) OVERRIDING SYSTEM VALUE VALUES (6, 6, 9, 1);


--
-- TOC entry 3359 (class 0 OID 28298)
-- Dependencies: 213
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (7, 'abc', 'abc', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (9, 'abc', 'abc', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (10, 'abcd', 'abcd', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (11, 'abcd', 'abcd', '');


--
-- TOC entry 3361 (class 0 OID 28302)
-- Dependencies: 215
-- Data for Name: presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.presentation (id, name, is_deleted, slide_count, created_at, updated_at, group_id, chats, questions) OVERRIDING SYSTEM VALUE VALUES (4, 'abcd', true, 1, '2011-01-01 10:01:00', '2011-01-01 10:01:00', NULL, NULL, NULL);
INSERT INTO public.presentation (id, name, is_deleted, slide_count, created_at, updated_at, group_id, chats, questions) OVERRIDING SYSTEM VALUE VALUES (5, 'abcde', false, 2, '2022-11-14 15:35:42', '2022-12-14 15:40:02', NULL, NULL, NULL);
INSERT INTO public.presentation (id, name, is_deleted, slide_count, created_at, updated_at, group_id, chats, questions) OVERRIDING SYSTEM VALUE VALUES (7, 'test', false, 1, '2011-01-01 10:01:00', '2011-01-01 10:01:00', NULL, NULL, NULL);
INSERT INTO public.presentation (id, name, is_deleted, slide_count, created_at, updated_at, group_id, chats, questions) OVERRIDING SYSTEM VALUE VALUES (9, 'abcde', false, 2, '2023-01-04 14:59:41', '2023-01-04 14:59:41', 0, NULL, NULL);
INSERT INTO public.presentation (id, name, is_deleted, slide_count, created_at, updated_at, group_id, chats, questions) OVERRIDING SYSTEM VALUE VALUES (8, 'test', false, 6, '2011-01-01 10:01:00', '2011-01-01 10:01:00', NULL, 'abcdef', 'abcdef');


--
-- TOC entry 3363 (class 0 OID 28307)
-- Dependencies: 217
-- Data for Name: slide; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (6, 1, 5, '{"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":1}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (8, 1, 7, '{"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (12, 1, 8, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (13, 1, 8, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (14, 1, 8, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (15, 1, 9, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (16, 1, 9, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":0},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (10, 1, 8, '{"value":1,"title":"Multiple Choice","data":[{"name":"Option 1","count":1},{"name":"Option 2","count":0},{"name":"Option 3","count":0}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (11, 1, 8, '{"value":1,"title":"","data":[{"name":"Option 1","count":12},{"name":"Option 2","count":6},{"name":"Option 3","count":5}]}', false);
INSERT INTO public.slide (id, slide_type_id, presentation_id, content, is_deleted) OVERRIDING SYSTEM VALUE VALUES (9, 3, 8, '{"value":3,"title":"Paragraph","data":{"Paragraph":"abcdef"}}', false);


--
-- TOC entry 3365 (class 0 OID 28314)
-- Dependencies: 219
-- Data for Name: slide_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.slide_type (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Multiple Choice');
INSERT INTO public.slide_type (id, name) OVERRIDING SYSTEM VALUE VALUES (2, 'Heading');
INSERT INTO public.slide_type (id, name) OVERRIDING SYSTEM VALUE VALUES (3, 'Paragraph');


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 210
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_id_seq"', 7, true);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 212
-- Name: account_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_id_seq', 17, true);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 222
-- Name: account_presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_presentation_id_seq', 6, true);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 214
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_id_seq', 11, true);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 216
-- Name: presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presentation_id_seq', 9, true);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 218
-- Name: slide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_id_seq', 16, true);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 220
-- Name: slide_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_type_id_seq', 3, true);


--
-- TOC entry 3197 (class 2606 OID 28319)
-- Name: account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 28321)
-- Name: account_group account_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 28363)
-- Name: account_presentation account_presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 28323)
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 28325)
-- Name: presentation presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT presentation_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 28327)
-- Name: slide slide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 28329)
-- Name: slide_type slide_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide_type
    ADD CONSTRAINT slide_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 28330)
-- Name: account_group account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_id FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3214 (class 2606 OID 28364)
-- Name: account_presentation account_presentation_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3215 (class 2606 OID 28369)
-- Name: account_presentation account_presentation_presentation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_presentation_id_fkey FOREIGN KEY (presentation_id) REFERENCES public.presentation(id) NOT VALID;


--
-- TOC entry 3211 (class 2606 OID 28335)
-- Name: account_group group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public."group"(id) NOT VALID;


--
-- TOC entry 3212 (class 2606 OID 28340)
-- Name: slide presentation_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT presentation_id_foreign_key FOREIGN KEY (presentation_id) REFERENCES public.presentation(id);


--
-- TOC entry 3213 (class 2606 OID 28350)
-- Name: slide slide_type_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_type_id_foreign_key FOREIGN KEY (slide_type_id) REFERENCES public.slide_type(id);


-- Completed on 2023-01-06 23:13:11

--
-- PostgreSQL database dump complete
--

