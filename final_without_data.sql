--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2023-01-09 17:56:01

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
    questions text,
    is_presenting boolean
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


-- Completed on 2023-01-09 17:56:01

--
-- PostgreSQL database dump complete
--