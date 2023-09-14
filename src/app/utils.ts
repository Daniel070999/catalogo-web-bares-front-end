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
    nombre?: any;
    descripcion?: any;
    precio?: any;
    id_bar?: any;

}

export class RegisterNewBar {
    nombre?: any;
    lema?: any;
    descripcion?: any;
}