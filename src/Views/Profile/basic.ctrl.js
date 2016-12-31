import React from 'react';
const { Component } = React;

export default class BasicCtrl extends Component {
    onHandlerGuardarNombres = (e, obj) => {
        this.props.store.profile.update({
            nombres: this.form.nombres,
            apellidos: this.form.apellidos
        })
            .then((response) => {
                this.props.store.getState().session.nombres = this.form.nombres;
                this.props.store.getState().session.apellidos = this.form.apellidos;
                this.props.store.setState({updateAt: new Date()});
            })
            .catch((error) => {
                console.log(error);
            });
    }
    onHandlerGuardarEmail = (e, obj, permiso) => {
        console.log(obj);
        this.props.store.profile.update({
            email: this.form.email,
            permiso_email: permiso
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}