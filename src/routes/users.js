import { useSelector } from 'react-redux';
import { Button, Container, Table, Modal, Form, FormGroup, Label, Input, ModalHeader, Spinner } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../action/users';
import { v4 as uuidv4 } from 'uuid';
import { deleteUser } from '../action/users';
import { updateUser } from '../action/users';

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  const uuid = uuidv4();

  const dispatch = useDispatch();

  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [id, setId] = useState('');

  const [tambahData, setTambahData] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const toggleTambahDataHandler = () => {
    setNama('');
    setJurusan('');
    setTambahData(!tambahData);
  };
  const toggleUpdateDataHandler = () => {
    setUpdateData(!updateData);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const user = { id: uuid, nama, jurusan };
    dispatch(postUser(user));

    setNama('');
    setJurusan('');
    setTambahData(false);
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    const newUser = { nama, jurusan };
    dispatch(updateUser(id, newUser));
    setUpdateData(false);
  };

  const updateHandler = (e, id) => {
    e.preventDefault();

    fetch('http://localhost:5000/users/' + id)
      .then((Response) => Response.json())
      .then((user) => {
        setNama(user.nama);
        setJurusan(user.jurusan);
        setId(id);
      });

    setUpdateData(!updateData);
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };
  return (
    <div className="mt-5">
      <Container>
        <Button color="primary" className="mb-3" onClick={toggleTambahDataHandler}>
          Tambah User
        </Button>
        <Table responsive={true} hover bordered striped>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Spinner color="primary" size="md" children=""></Spinner>}
            {!loading &&
              users.map((user, index) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{user.nama}</td>
                      <td>{user.jurusan}</td>
                      <td>
                        <div class="action-button">
                          <Button size="sm" onClick={(e) => deleteHandler(e, user.id)} color="danger">
                            Delete
                          </Button>
                          <Button size="sm" onClick={(e) => updateHandler(e, user.id)} color="secondary">
                            Update
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>

        <Modal autoFocus size="lg" scrollable isOpen={tambahData} toggle={toggleTambahDataHandler}>
          <Form onSubmit={submitFormHandler}>
            <FormGroup>
              <ModalHeader>Tambah Data</ModalHeader>
              <Label for="nama">nama</Label>
              <Input onChange={(e) => setNama(e.target.value)} placeholder="nama" type="text" value={nama} required />
              <Label for="jurusan">jurusan</Label>
              <Input onChange={(e) => setJurusan(e.target.value)} placeholder="jurusan" type="text" value={jurusan} required />
              {!loading && <Button>Kirim</Button>}
              {loading && <Button disabled>Sedang mengirim...</Button>}
            </FormGroup>
          </Form>
        </Modal>

        <Modal autoFocus size="lg" scrollable isOpen={updateData} toggle={toggleUpdateDataHandler}>
          <Form onSubmit={submitUpdateHandler}>
            <FormGroup>
              <ModalHeader>Update Data</ModalHeader>
              <Label for="nama">nama</Label>
              <Input onChange={(e) => setNama(e.target.value)} placeholder="nama" type="text" value={nama} required />
              <Label for="jurusan">jurusan</Label>
              <Input onChange={(e) => setJurusan(e.target.value)} placeholder="jurusan" type="text" value={jurusan} required />
              {!loading && <Button>Update</Button>}
              {loading && <Button disabled>Sedang Update...</Button>}
            </FormGroup>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default Users;
