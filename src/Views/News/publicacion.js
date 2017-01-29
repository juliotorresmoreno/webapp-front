import React from 'react';

import { Form, Comment, Image } from 'semantic-ui-react'
import Comentario from './comentario';
import PublicacionCtrl from './publicacion.ctrl';

const moment = window.moment;

const styleIcon = {width:16,height:16,display:"inline"};

export default class Publicacion extends PublicacionCtrl {
    comentario = "";
    go = (e) => {
        e.preventDefault();
        this.props.router.push(e.target.href.replace(/http(s){0,1}:\/\/[^\/]*/, ''));
    }
    render = () => {
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        const url = store.getState().config.api + "/" + noticia.usuario + "/galery/fotoPerfil?token=" + this.props.store.getState().session.token;
        const href = "/" + noticia.usuario + "/profile";
        const fecha = moment(noticia.create_at).format("MMM Do YYYY h:mm:ss a");
        const responder = store.lang.get("noticias_responder");
        const comentarios = noticia.comentarios || [];
        return (
            <div>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src={url} />
                        <Comment.Content>
                            <Comment.Author as='a' href={href} onClick={this.go}>
                                {noticia.nombres + " " + noticia.apellidos}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{fecha}</div>
                            </Comment.Metadata>
                            <Comment.Text>{noticia.noticia}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action onClick={this.onHandlerLike}>
                                    <Image style={styleIcon} src="/static/svg/like-1.svg" />
                                    <Comment.Metadata>
                                        {noticia.likes.length} likes
                                    </Comment.Metadata>
                                </Comment.Action>
                                <Comment.Action onClick={this.onHandlerReply}>
                                    {responder}
                                </Comment.Action>
                            </Comment.Actions>
                            {comentarios.map((comentario, index) => <Comentario store={store} comentario={comentario} key={index} />)}
                            <Form.Input name="comentario" 
                                onChange={this.onHandlerChange}
                                onKeyPress={this.onHandlerKeyPress}
                                value={this.comentario}
                                style={{width: 300}} />
                        </Comment.Content>
                    </Comment>
                </Comment.Group>
            </div>
        )
    }
}