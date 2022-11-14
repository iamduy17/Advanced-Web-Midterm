--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-11-14 23:35:03

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
-- TOC entry 210 (class 1259 OID 33263)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    "ID" integer NOT NULL,
    "Username" character varying(50) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "Password" character varying(100),
    "Role" integer NOT NULL,
    "External_ID" character varying(50),
    "isActivated" integer NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 33286)
-- Name: Account_Group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account_Group" (
    "ID" integer NOT NULL,
    "GroupID" integer NOT NULL,
    "AccountID" integer NOT NULL
);


ALTER TABLE public."Account_Group" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 33285)
-- Name: Account_Group_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Account_Group" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Account_Group_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 33262)
-- Name: Account_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Account" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Account_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 33269)
-- Name: Group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Group" (
    "ID" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(100),
    "InvitationLink" character varying(200) NOT NULL
);


ALTER TABLE public."Group" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 33268)
-- Name: Group_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Group" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Group_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3322 (class 0 OID 33263)
-- Dependencies: 210
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" ("ID", "Username", "Email", "Password", "Role", "External_ID", "isActivated") FROM stdin;
\.


--
-- TOC entry 3326 (class 0 OID 33286)
-- Dependencies: 214
-- Data for Name: Account_Group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account_Group" ("ID", "GroupID", "AccountID") FROM stdin;
\.


--
-- TOC entry 3324 (class 0 OID 33269)
-- Dependencies: 212
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Group" ("ID", "Name", "Description", "InvitationLink") FROM stdin;
\.


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 213
-- Name: Account_Group_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_Group_ID_seq"', 1, false);


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 209
-- Name: Account_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_ID_seq"', 1, false);


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 211
-- Name: Group_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Group_ID_seq"', 1, false);


--
-- TOC entry 3179 (class 2606 OID 33290)
-- Name: Account_Group Account_Group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account_Group"
    ADD CONSTRAINT "Account_Group_pkey" PRIMARY KEY ("GroupID");


--
-- TOC entry 3175 (class 2606 OID 33267)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3177 (class 2606 OID 33273)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3180 (class 2606 OID 33291)
-- Name: Account_Group Account_Group_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account_Group"
    ADD CONSTRAINT "Account_Group_fk0" FOREIGN KEY ("GroupID") REFERENCES public."Group"("ID") NOT VALID;


--
-- TOC entry 3181 (class 2606 OID 33296)
-- Name: Account_Group Account_Group_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account_Group"
    ADD CONSTRAINT "Account_Group_fk1" FOREIGN KEY ("AccountID") REFERENCES public."Account"("ID") NOT VALID;


-- Completed on 2022-11-14 23:35:03

--
-- PostgreSQL database dump complete
--

