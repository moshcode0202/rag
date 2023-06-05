import React, { useState, useRef } from 'react'
import { Field, Form, Formik } from 'formik'
const Jhj = () => {
    const [params, setParams] = useState([])
    const [selectedData, setSelectedData] = useState({ id: '', firstName: '', lastName: '' })
    const [id, setId] = useState(0)

    const formRef = useRef()
    const defaultParams = { id: '', name: '', email: '', message: '' };
    const [formikParams, setFormikParams] = useState(defaultParams)
    const [list, setList] = useState([])
    const [number, setNumber] = useState(0)

    const addData = () => {
        if (selectedData.id) {
            const newData = params.map((item) => {
                if (item.id === selectedData.id) {
                    return { ...params, firstName: selectedData.firstName, lastName: selectedData.lastName }
                }
                return item
            })
            setParams(newData)
        } else {
            setParams([...params, { id: id + 1, firstName: selectedData.firstName, lastName: selectedData.lastName }])
            setId(id + 1)
            setSelectedData({ id: '', firstName: '', lastName: '' })
        }
    }

    const formSubmit = (values) => {
        console.log(values, 'values');
        if (formikParams.id) {
            const newData = list.map((data) => {
                // console.log(data,'data');
                if (data.id === formikParams.id) {
                    return { ...data, id: values.id, name: values.name, email: values.email, message: values.message }
                }
                return data
            })
            setList(newData)
            formRef.current.resetForm();
            setFormikParams(defaultParams)
        } else {
            setList([...list, { id: number + 1, name: values.name, email: values.email, message: values.message }])
            setNumber(number + 1)
            // setFormikParams(defaultParams)
            formRef.current.resetForm();
        }
    }

    const displayData = (data) => {
        formRef.current.setValues(data)
        setFormikParams({ ...formikParams, id: data.id, name: data.name, email: data.email, message: data.message })
    }
   

    return (
        <div className='flex'>
            <div>
                <div className='text-white font-bold text-2xl'>Dashboard</div>
                <div className="flex"><label>firstName :-</label>
                    <input type="text" value={selectedData.firstName} onChange={(e) => setSelectedData({ ...selectedData, firstName: e.target.value })} />
                </div>
                <div className="flex"><label>lastName :- </label>
                    <input type="text" value={selectedData.lastName} onChange={(e) => setSelectedData({ ...selectedData, lastName: e.target.value })} />
                </div>
                <button type="button" onClick={addData}>{selectedData.id ? 'EditData' : 'addData'}</button>
                {params.map((data, i) => {
                    return (<div key={i}>
                        <div onClick={() => { setSelectedData({ id: data.id, firstName: data.firstName, lastName: data.lastName }); }}>
                            {data.firstName + ' ' + data.lastName}
                        </div>
                    </div>)
                })}
            </div>
            <div>
                <h1>formik with data</h1>
                <Formik innerRef={formRef} initialValues={formikParams} onSubmit={formSubmit}>
                    {({ isSubmitting, values, setValues }) => (
                        <Form>
                            <label htmlFor="name">Name:</label>
                            <Field type="text" name="name" id="name" />
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" id="email" />
                            <label htmlFor="message">Message:</label>
                            <Field as="textarea" name="message" id="message" />
                            <button type="submit">{formikParams?.id ? 'Edit' : 'Add'}Data</button>
                        </Form>
                    )}
                </Formik>
                {list.map((d) => {
                    return (
                        <div key={d.id}>
                            <ul className='flex flex-row'>
                                <li>{d.id}</li>
                                <li>{d.name}</li>
                                <li>{d.email}</li>
                                <li>{d.message}</li>
                                <li><button type="button" onClick={() => displayData(d)}>Edit</button></li>
                            </ul>
                        </div>
                    )
                })}
            </div>

            <div id="myDiv">
                <p className="myClass">Element 1</p>
                <p className="myClass">Element 2</p>
                <p className="myClass">Element 3</p>
            </div>

        </div>
    )
}

export default Jhj

