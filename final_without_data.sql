--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2023-01-09 21:57:26

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
-- TOC entry 209 (class 1259 OID 36354)
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
-- TOC entry 210 (class 1259 OID 36359)
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
-- TOC entry 211 (class 1259 OID 36360)
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
-- TOC entry 212 (class 1259 OID 36363)
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
-- TOC entry 213 (class 1259 OID 36364)
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
-- TOC entry 214 (class 1259 OID 36367)
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
-- TOC entry 215 (class 1259 OID 36368)
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
-- TOC entry 216 (class 1259 OID 36371)
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
-- TOC entry 217 (class 1259 OID 36372)
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
    questions text,
    is_presenting boolean
);


ALTER TABLE public.presentation OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 36378)
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
-- TOC entry 219 (class 1259 OID 36379)
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
-- TOC entry 220 (class 1259 OID 36385)
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
-- TOC entry 221 (class 1259 OID 36386)
-- Name: slide_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slide_type (
    id integer NOT NULL,
    name character varying(200) NOT NULL
);


ALTER TABLE public.slide_type OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 36389)
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
-- TOC entry 3355 (class 0 OID 36354)
-- Dependencies: 209
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3357 (class 0 OID 36360)
-- Dependencies: 211
-- Data for Name: account_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3359 (class 0 OID 36364)
-- Dependencies: 213
-- Data for Name: account_presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3361 (class 0 OID 36368)
-- Dependencies: 215
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3363 (class 0 OID 36372)
-- Dependencies: 217
-- Data for Name: presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3365 (class 0 OID 36379)
-- Dependencies: 219
-- Data for Name: slide; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3367 (class 0 OID 36386)
-- Dependencies: 221
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

SELECT pg_catalog.setval('public."Account_id_seq"', 1, false);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 212
-- Name: account_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_id_seq', 1, false);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 214
-- Name: account_presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_presentation_id_seq', 1, false);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 216
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_id_seq', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 218
-- Name: presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presentation_id_seq', 1, false);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 220
-- Name: slide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_id_seq', 1, false);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 222
-- Name: slide_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slide_type_id_seq', 1, false);


--
-- TOC entry 3197 (class 2606 OID 36391)
-- Name: account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 36393)
-- Name: account_group account_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 36395)
-- Name: account_presentation account_presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 36397)
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 36399)
-- Name: presentation presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT presentation_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 36401)
-- Name: slide slide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 36403)
-- Name: slide_type slide_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide_type
    ADD CONSTRAINT slide_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3210 (class 2606 OID 36404)
-- Name: account_group account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_id FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3212 (class 2606 OID 36409)
-- Name: account_presentation account_presentation_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3213 (class 2606 OID 36414)
-- Name: account_presentation account_presentation_presentation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_presentation
    ADD CONSTRAINT account_presentation_presentation_id_fkey FOREIGN KEY (presentation_id) REFERENCES public.presentation(id) NOT VALID;


--
-- TOC entry 3211 (class 2606 OID 36419)
-- Name: account_group group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public."group"(id) NOT VALID;


--
-- TOC entry 3214 (class 2606 OID 36424)
-- Name: slide presentation_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT presentation_id_foreign_key FOREIGN KEY (presentation_id) REFERENCES public.presentation(id);


--
-- TOC entry 3215 (class 2606 OID 36429)
-- Name: slide slide_type_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slide
    ADD CONSTRAINT slide_type_id_foreign_key FOREIGN KEY (slide_type_id) REFERENCES public.slide_type(id);


-- Completed on 2023-01-09 21:57:27

--
-- PostgreSQL database dump complete
--