export class RegisterModel {
    usuario?: String;
    clave?: String;
    email?: String;
    nombre?: String;
    genero?: String;
    telefono?: String;
    fechanacimiento?: String;
    id_registro?: String;
}

export class LoginData {
    usuario?: String;
    email?: String;
    clave?: String;

}

export class RegisterNewMenu {
    nombre?: String;
    descripcion?: String;
    precio?: String;
    id_bar?: String;

}

export class RegisterNewBar {
    nombre?: String;
    lema?: String;
    descripcion?: String;
    logo?: Blob;

}