--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-12-11 15:37:18

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
-- TOC entry 210 (class 1259 OID 28161)
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
-- TOC entry 209 (class 1259 OID 28160)
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
-- TOC entry 213 (class 1259 OID 28172)
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
-- TOC entry 214 (class 1259 OID 28175)
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
-- TOC entry 212 (class 1259 OID 28167)
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
-- TOC entry 211 (class 1259 OID 28166)
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
-- TOC entry 216 (class 1259 OID 28223)
-- Name: presentation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.presentation (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    slide_count integer NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.presentation OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 28222)
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
-- TOC entry 220 (class 1259 OID 28244)
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
-- TOC entry 219 (class 1259 OID 28243)
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
-- TOC entry 218 (class 1259 OID 28230)
-- Name: slide_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slide_type (
    id integer NOT NULL,
    name character varying(200) NOT NULL
);


ALTER TABLE public.slide_type OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 28229)
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
-- TOC entry 3348 (class 0 OID 28161)
-- Dependencies: 210
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account (id, username, password, email, external_id, is_activated, provider) OVERRIDING SYSTEM VALUE VALUES (6, 'Thới Hải Đức', NULL, 'haiduc0147@gmail.com', '101224525184439385427', true, 'google');
INSERT INTO public.account (id, username, password, email, external_id, is_activated, provider) OVERRIDING SYSTEM VALUE VALUES (7, 'admin', '$2a$10$oL87ku4YXcnAlu5lKACwUeBAyXaOI2w5oAgceZMwkP0HFb9bswbGy', 'Haiduc0147@gmail.com', NULL, true, 'local');


--
-- TOC entry 3351 (class 0 OID 28172)
-- Dependencies: 213
-- Data for Name: account_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (14, 8, 6, 1);
INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (15, 9, 7, 1);
INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (16, 10, 7, 1);
INSERT INTO public.account_group (id, group_id, account_id, role) OVERRIDING SYSTEM VALUE VALUES (17, 11, 6, 1);


--
-- TOC entry 3350 (class 0 OID 28167)
-- Dependencies: 212
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (7, 'abc', 'abc', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (8, 'abc', 'abc', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (9, 'abc', 'abc', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (10, 'abcd', 'abcd', '');
INSERT INTO public."group" (id, name, description, invitation_link) OVERRIDING SYSTEM VALUE VALUES (11, 'abcd', 'abcd', '');


--
-- TOC entry 3354 (class 0 OID 28223)
-- Dependencies: 216
-- Data for Name: presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.presentation (id, name, is_deleted, slide_count, owner_id, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (4, 'abcd', true, 1, 6, '2011-01-01 10:01:00', '2011-01-01 10:01:00');


--
-- TOC entry 3358 (class 0 OID 28244)
-- Dependencies: 220
-- Data for Name: slide; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3356 (class 0 OID 28230)
-- Dependencies: 218
-- Data for Name: slide_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.slide_type (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Multiple Choice');


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 209
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_id_seq"', 7, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 214
-- Name: account_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_id_seq', 17, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 211
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_id_seq', 11, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 215
-- Name: presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presentation_id_seq', 4, true);


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 219
-- Name: slide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_id_seq', 4, true);


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 217
-- Name: slide_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_type_id_seq', 1, true);


--
-- TOC entry 3192 (class 2606 OID 28165)
-- Name: account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 28180)
-- Name: account_group account_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 28171)
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 28228)
-- Name: presentation presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT presentation_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 28250)
-- Name: slide slide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 28234)
-- Name: slide_type slide_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide_type
    ADD CONSTRAINT slide_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 28181)
-- Name: account_group account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_id FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3204 (class 2606 OID 28186)
-- Name: account_group group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public."group"(id) NOT VALID;


--
-- TOC entry 3207 (class 2606 OID 28256)
-- Name: slide presentation_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT presentation_id_foreign_key FOREIGN KEY (presentation_id) REFERENCES public.presentation(id);


--
-- TOC entry 3205 (class 2606 OID 28261)
-- Name: presentation presentation_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT presentation_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3206 (class 2606 OID 28251)
-- Name: slide slide_type_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_type_id_foreign_key FOREIGN KEY (slide_type_id) REFERENCES public.slide_type(id);


-- Completed on 2022-12-11 15:37:19

--
-- PostgreSQL database dump complete
--

