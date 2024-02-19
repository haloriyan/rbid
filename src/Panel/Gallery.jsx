import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";
import axios from "axios";
import config from "../config";
import TitleAdmin from "../Partials/TitleAdmin";
import styles from "./styles/Gallery.module.css";
import Button from "../components/Button";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
import Popup from "../components/Popup";
import InputFile from "../components/InputFile";
import Alert from "../components/Alert";
import Input from "../components/Input";

const Gallery = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [message, setMessage] = useState(null);

    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delBtn, setDelBtn] = useState('Hapus Gambar');
    const [editBtn, setEditBtn] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/user/wedding/${id}/gallery`)
            .then(response => {
                let res = response.data;
                setImages(res.images);
                setLoading(false);
            })
        }
    }, [isLoading, triggerLoading]);

    const resetForm = () => {
        setLoading(true);
        setTriggerLoading(true);
    }
    const submit = input => {
        let formData = new FormData();
        formData.append('image', input);
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/gallery/store`, formData)
        .then(response => {
            resetForm(response.data.message);
        })
    }
    const update = e => {
        setEditBtn('Menyimpan...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/gallery/update`, {
            image_id: image.id,
            caption,
        })
        .then(response => {
            resetForm(response.data.message);
            setEditing(false);
            setEditBtn('Simpan Perubahan');
        })
        e.preventDefault();
    }
    const del = e => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/gallery/delete`, {
            image_id: image.id,
        })
        .then(response => {
            resetForm(response.data.message);
            setDeleting(false);
            setDelBtn('Hapus Gambar');
        })
        e.preventDefault();
    }

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} />
            <LeftMenu active={'gallery'} weddingID={id} />
            <div className="content user">
                <TitleAdmin
                    title="Galeri"
                    description="Koleksi album foto pengantin"
                />

                {
                    message !== null &&
                    <Alert message={message} setMessage={setMessage} />
                }

                {
                    !isLoading &&
                    <div className={styles.Container}>
                        {
                            images.map((img, i) => (
                                <div className={styles.Item} key={i}>
                                    <img src={`${config.baseUrl}/storage/gallery_images/${img.filename}`} alt={img.caption} className={styles.Image} />
                                    {
                                        img.caption !== null &&
                                        <div className={`${styles.Hoverable} ${styles.Caption}`}> {img.caption}</div>
                                    }
                                    <div className={`${styles.Hoverable} ${styles.Buttons}`}>
                                        <Button circle height={32} color="green" onClick={() => {
                                            setImage(img);
                                            setCaption(img.caption);
                                            setEditing(true);
                                        }}>
                                            <BiEdit size={12} />
                                        </Button>
                                        <Button circle height={32} color="red" onClick={() => {
                                            setImage(img);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash size={12} />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                        <InputFile
                            autoClear={true}
                            containerStyle={{
                                flexBasis: '15%',
                                flexGrow: 1,
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                aspectRatio: 1,
                            }}
                            labelStyle={{fontSize: 12}}
                            label="Upload Gambar"
                            onChange={(input, e) => {
                                submit(input.files[0]);
                            }}
                        />
                    </div>
                }
            </div>

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Gambar"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus gambar ini? Gambar yang terhapus tidak dapat dipulihkan</div>
                        <Button style={{width: '100%'}} color="red">{delBtn}</Button>
                        <Button style={{width: '100%'}} color="muted" accent="secondary" type="button" onClick={() => setDeleting(false)}>batalkan</Button>
                    </form>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <TitleAdmin
                        title="Edit Caption"
                        description="Ubah keterangan gambar"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setEditing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={update}>
                        <div className="inline">
                            <img src={`${config.baseUrl}/storage/gallery_images/${image.filename}`} alt={image.caption} style={{
                                height: 120,
                                aspectRatio: 1,
                                borderRadius: 6,
                                objectFit: 'cover',
                            }} />
                            <div style={{display: 'flex',flexGrow: 1}}>
                                <Input label="Caption" value={caption} onInput={e => setCaption(e.currentTarget.value)} />
                            </div>
                        </div>
                        <Button style={{width: '100%'}}>{editBtn}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Gallery;