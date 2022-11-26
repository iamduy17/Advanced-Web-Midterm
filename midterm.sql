--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-11-19 12:30:21

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
-- TOC entry 3322 (class 0 OID 28161)
-- Dependencies: 210
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3325 (class 0 OID 28172)
-- Dependencies: 213
-- Data for Name: account_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3324 (class 0 OID 28167)
-- Dependencies: 212
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 209
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_id_seq"', 1, false);


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 214
-- Name: account_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_id_seq', 1, false);


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 211
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_id_seq', 1, false);


--
-- TOC entry 3175 (class 2606 OID 28165)
-- Name: account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3179 (class 2606 OID 28180)
-- Name: account_group account_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 28171)
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- TOC entry 3180 (class 2606 OID 28181)
-- Name: account_group account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_id FOREIGN KEY (account_id) REFERENCES public.account(id) NOT VALID;


--
-- TOC entry 3181 (class 2606 OID 28186)
-- Name: account_group group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public."group"(id) NOT VALID;


-- Completed on 2022-11-19 12:30:21

--
-- PostgreSQL database dump complete
--

