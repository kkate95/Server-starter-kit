--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.5

-- Started on 2018-03-29 14:05:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Server-starter-kit";
--
-- TOC entry 2152 (class 1262 OID 16385)
-- Name: Server-starter-kit; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Server-starter-kit" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE "Server-starter-kit" OWNER TO postgres;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 9 (class 2615 OID 16410)
-- Name: crpt; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA crpt;


ALTER SCHEMA crpt OWNER TO postgres;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2155 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 16413)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA crpt;


--
-- TOC entry 2156 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 16401)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE refresh_tokens (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    token character varying(255) NOT NULL,
    expired_at timestamp without time zone NOT NULL
);


ALTER TABLE refresh_tokens OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16399)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 2157 (class 0 OID 0)
-- Dependencies: 185
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE refresh_tokens_id_seq OWNED BY refresh_tokens.id;


--
-- TOC entry 184 (class 1259 OID 16388)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id bigint NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(250) NOT NULL,
    reg_token character varying(255) NOT NULL,
    is_confirmed boolean DEFAULT false NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16386)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- TOC entry 2158 (class 0 OID 0)
-- Dependencies: 183
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2028 (class 2604 OID 16404)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY refresh_tokens ALTER COLUMN id SET DEFAULT nextval('refresh_tokens_id_seq'::regclass);


--
-- TOC entry 2026 (class 2604 OID 16391)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2030 (class 2606 OID 16396)
-- Name: pk_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_id PRIMARY KEY (id);


--
-- TOC entry 2032 (class 2606 OID 16398)
-- Name: unic_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT unic_email UNIQUE (email);


--
-- TOC entry 2033 (class 2606 OID 16405)
-- Name: fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY refresh_tokens
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-03-29 14:05:16

--
-- PostgreSQL database dump complete
--

