--TABLES....................................................................................................
CREATE TABLE public.users
(
    id serial not null,
    name character varying(30) not null,
    registration_date bigint not null,
    email character varying(30) not null,
    password character varying(20) not null
);

CREATE TABLE public.ratings
(
    id serial not null,
    movie_id int not null,
    user_id int not null,
    value int not null,
    date bigint not null
);

CREATE TABLE public.pictures
(
    id serial not null,
    upload_date bigint not null,
    route character varying(300) not null,
    user_id int not null
);

CREATE TABLE public.watchlists
(
    id serial not null,
    user_id int not null,
    movie_id int not null
);

CREATE TABLE public.favorites
(
    id serial not null,
    user_id int not null,
    movie_id int not null
);

CREATE TABLE public.friends
(
    id serial not null,
    user_id_1 int not null,
    user_id_2 int not null
);

CREATE TABLE public.friend_requests
(
    id serial not null,
    user_from int not null,
    user_to int not null
);

--ADD PRIMARY KEY...........................................................................................
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (id);

--ADD FOREIGN KEY...........................................................................................
ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT user_id_1 FOREIGN KEY (user_id_1) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.friends
    ADD CONSTRAINT user_id_2 FOREIGN KEY (user_id_2) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT user_from FOREIGN KEY (user_from) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT user_to FOREIGN KEY (user_to) REFERENCES public.users(id) ON DELETE CASCADE;
