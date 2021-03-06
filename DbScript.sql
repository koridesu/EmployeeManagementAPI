PGDMP                         x            EmployeeManagementSystemDB    12.4    12.4 (    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    24936    EmployeeManagementSystemDB    DATABASE     �   CREATE DATABASE "EmployeeManagementSystemDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Turkish_Turkey.1254' LC_CTYPE = 'Turkish_Turkey.1254';
 ,   DROP DATABASE "EmployeeManagementSystemDB";
                postgres    false            �            1259    24950    degree    TABLE        CREATE TABLE public.degree (
    id integer NOT NULL,
    degreename text NOT NULL,
    department text NOT NULL,
    startdate timestamp with time zone NOT NULL,
    finishdate timestamp with time zone,
    employeeid integer,
    departmentid integer
);
    DROP TABLE public.degree;
       public         heap    postgres    false            �            1259    24948    degree_id_seq    SEQUENCE     �   CREATE SEQUENCE public.degree_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.degree_id_seq;
       public          postgres    false    203            ;           0    0    degree_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.degree_id_seq OWNED BY public.degree.id;
          public          postgres    false    202            �            1259    24972 
   department    TABLE     �   CREATE TABLE public.department (
    id integer NOT NULL,
    name text NOT NULL,
    managerid integer,
    locationid integer
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    24970    department_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.department_id_seq;
       public          postgres    false    205            <           0    0    department_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;
          public          postgres    false    204            �            1259    24994    employee    TABLE     '  CREATE TABLE public.employee (
    id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email text,
    phone integer,
    startdate timestamp with time zone NOT NULL,
    salary integer NOT NULL,
    supervisor text NOT NULL,
    degree text,
    departmentid integer
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    24992    employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.employee_id_seq;
       public          postgres    false    207            =           0    0    employee_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;
          public          postgres    false    206            �            1259    25016    location    TABLE     �   CREATE TABLE public.location (
    id integer NOT NULL,
    name text NOT NULL,
    adres text NOT NULL,
    postcode integer,
    city text NOT NULL,
    country text NOT NULL
);
    DROP TABLE public.location;
       public         heap    postgres    false            �            1259    25014    location_id_seq    SEQUENCE     �   CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.location_id_seq;
       public          postgres    false    209            >           0    0    location_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;
          public          postgres    false    208            �            1259    25038    user    TABLE     p   CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    25036    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    211            ?           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    210            �
           2604    24953 	   degree id    DEFAULT     f   ALTER TABLE ONLY public.degree ALTER COLUMN id SET DEFAULT nextval('public.degree_id_seq'::regclass);
 8   ALTER TABLE public.degree ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    24975    department id    DEFAULT     n   ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);
 <   ALTER TABLE public.department ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    24997    employee id    DEFAULT     j   ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);
 :   ALTER TABLE public.employee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    25019    location id    DEFAULT     j   ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);
 :   ALTER TABLE public.location ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    25041    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            ,          0    24950    degree 
   TABLE DATA           m   COPY public.degree (id, degreename, department, startdate, finishdate, employeeid, departmentid) FROM stdin;
    public          postgres    false    203   �*       .          0    24972 
   department 
   TABLE DATA           E   COPY public.department (id, name, managerid, locationid) FROM stdin;
    public          postgres    false    205   �+       0          0    24994    employee 
   TABLE DATA           x   COPY public.employee (id, name, surname, email, phone, startdate, salary, supervisor, degree, departmentid) FROM stdin;
    public          postgres    false    207   @,       2          0    25016    location 
   TABLE DATA           L   COPY public.location (id, name, adres, postcode, city, country) FROM stdin;
    public          postgres    false    209   �-       4          0    25038    user 
   TABLE DATA           8   COPY public."user" (id, username, password) FROM stdin;
    public          postgres    false    211   }.       @           0    0    degree_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.degree_id_seq', 17, true);
          public          postgres    false    202            A           0    0    department_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.department_id_seq', 5, true);
          public          postgres    false    204            B           0    0    employee_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.employee_id_seq', 11, true);
          public          postgres    false    206            C           0    0    location_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.location_id_seq', 2, true);
          public          postgres    false    208            D           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 15, true);
          public          postgres    false    210            �
           2606    24958    degree degree_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.degree
    ADD CONSTRAINT degree_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.degree DROP CONSTRAINT degree_pkey;
       public            postgres    false    203            �
           2606    24980    department department_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    205            �
           2606    25002    employee employee_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    207            �
           2606    25024    location location_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.location DROP CONSTRAINT location_pkey;
       public            postgres    false    209            �
           2606    25058    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    211            �
           2606    25062    user user_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_username_key;
       public            postgres    false    211            ,     x���MK1���Wx�.�$ٯ�`Ń�X���v��MRv����YAD[�l�9�ϼ��a��!���	.l�^��u��0 J�Y-P_����6e��\J=��
����V�yxs��j���$�1��J <��w�?�Wj��T5&�	��!͐I?%��=K�,����S���_m}�v�]x�>��'�hQ��K�+���ƼJ��l0�X�Ryn��}*�W聺>j�-U�?~YF(;�с�G%��F�PG^�<Ų�΄��D�      .   Y   x�3��O+)O,JuI-H,*�M�+�4�4�2�t��K�K�L�A�1�4�2��(�M�J-�/-JN-�44�4�2�5�5�5����� b+%      0   �  x����N�0���Ƚ�N���V4RՖ�`/H{%Ӭ���iy���{���޲���^hIH>X��ߌ�_�@V��pݸ7M�wʔ�Ar���@Ƒ������D~�1��s�j�_�]���m ˭�Z�$K���Am�5�O��:��5�I�Y�õ&a����Ȕ����$,z����Idqܡ?۵���[KB��� ���8�(yG<���#ݠ󚌏��`�#g�/��;_&͘�@��λx2g+X}��X2T)-6\mkO:ZZ��1d�,n���8-���n������#4��,�����xbPaPGy��1<�`��T�\m�Ei�AM�_��y�+�Ԅ帤�6.��/4a"~V��N��A '���pm���v7��>����S�EX��L�2����-f�lu�{�6_�      2   y   x�M�1!����Sp��F������̀�G��`��_��X��o�t�8��D_.١�������;b�6��0W$�"���>j�n��������c�P�e��6wk�4h3�:�%9����+��/W      4     x�5�9��0  К���H)8T�(���dˀ�����i���q��;�hD9��Y3����#���f�*;���xX{���Q���}%O Pi3��!�m��$�) �i!7��>tTVYC��\�����^FVo' 9jH�hK>��$��K7d��s�(�z�څ$��i�^R�wэ�U��Sc�����.���Z��c�<�cwEnX�J7Y?8�Ĉ�RX�qj����=ۆ�
�@Eu�q����]����6�`*�_�Q�푓���O�<'��ʌFð�/ �u�j�     