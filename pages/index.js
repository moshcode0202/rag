import { useCallback, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AnimateHeight from 'react-animate-height';
import IconTrash from "./components/IconTrash";
export default function Home() {
    const items1 = [
        {
            id: 1,
            text: "Need to be approved",
            name: "Kelly Young",
            children: [
                {
                    id: 20,
                    text: 'ffffff',
                    name: "nikunj",
                    type: 'image',
                    src: [],
                    subType: ''
                },
                {
                    id: 21,
                    text: 'gggggg',
                    name: "meet",
                    type: 'video',
                    src: [],
                    subType: ''
                },
            ]
        },
        {
            id: 2,
            text: "Meeting with client",
            name: "Andy King",
            children: [
                {
                    id: 22,
                    text: 'ffffff',
                    type: 'image',
                    src: [],
                    subType: ''
                },
                {
                    id: 23,
                    text: 'gggggg',
                    type: 'video',
                    src: [],
                    subType: ''
                },
            ]
        },
        {
            id: 3,
            text: "Project Detail",
            name: "Judy Holmes",
            children: [
                {
                    id: 24,
                    text: 'ffffff',
                    type: 'image',
                    src: [],
                    subType: ''
                },
                {
                    id: 25,
                    text: 'gggggg',
                    type: 'video',
                    src: [],
                    subType: ''
                },
            ]
        },
        {
            id: 4,
            text: "Edited Post Apporval",
            name: "Vincent Carpenter",
            children: [
                {
                    id: 26,
                    text: 'ffffff',
                    type: 'image',
                    src: [],
                    subType: ''
                },
                {
                    id: 27,
                    text: 'gggggg',
                    type: 'video',
                    src: [],
                    subType: ''
                },
            ]
        },
        {
            id: 5,
            text: "Project Lead Pickup",
            name: "Mary McDonald",
            children: [
                {
                    id: 28,
                    text: 'ffffff',
                    type: 'image',
                    src: [],
                    subType: ''
                },
                {
                    id: 29,
                    text: 'gggggg',
                    type: 'video',
                    src: [],
                    subType: ''
                },
            ]
        },
    ];
    const items2 = [
        {
            id: 6,
            name: "Header",
            text: "Header",
            type: 'header',
            children: []
        },
        {
            id: 7,
            name: "Meeting with client",
            text: "nitin",
            children: []
        },
        {
            id: 8,
            name: "Project Detail",
            text: "meet",
            children: []
        },
        {
            id: 9,
            name: "Edited Post Apporval",
            text: "fenil",
            children: []
        },
        {
            id: 10,
            name: "Footer",
            text: "Footer",
            type: 'footer',
            children: []
        },
    ];
    const items3 = [
        {
            id: 11,
            text: "Image",
            name: "nikunj",
            type: 'image'
        },
        {
            id: 12,
            text: "Video",
            name: "nitin",
            type: 'video'
        },
        // {
        //   id: 13,
        //   text: "testimonial",
        //   name: "meet",
        //   type: 'testimonial'.

        // },
        // {
        //   id: 14,
        //   text: "ddddddd",
        //   name: "fenil",
        // },
        // {
        //   id: 15,
        //   text: "eeeeeee",
        //   name: "sagar",
        // },
    ];
    const [sortable1, setSortable1] = useState(items1);
    const [sortable2, setSortable2] = useState(items2);
    const [sortable3, setSortable3] = useState(items3);
    const [sortable4, setSortable4] = useState();
    const [number, setNumber] = useState(0);
    const [modal1, setModal1] = useState(false);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [price, setPrice] = useState("");
    const [selected, setSelected] = useState(null);
    const [blockModal, setBlockModal] = useState(false);
    const [selectedDataModal, setselectedDataModal] = useState({ type: '', value: '' });
    const [selectedImageOption, setSelectedImageOption] = useState();
    const [parentData, setParentData] = useState()

    const addDataField = () => {
        setSortable2([
            ...sortable2,
            {
                id: number + 1,
                name: name,
                text: text,
                age: age,
                price: price,
                children: []
            },
        ]);
        setNumber(number + 1);
        setModal1(false);
        setName("");
        setText("");
        setAge("");
        setPrice("");
    };
    const editData = (item) => {
        setSelected(item);
        setModal1(true);
        setName(item.name);
        setText(item.text);
        setAge(item.age);
        setPrice(item.price);
    };
    const editDataField = () => {
        const newData = sortable2.map((items) => {
            if (items.id === selected.id) {
                return { ...items, name: name, text: text, age: age };
            }
            return items;
        });
        setSortable2(newData);
        setModal1(false);
        setSelected(null);
    };
    const closeModal = () => {
        setSelected(null);
        setModal1(false);
        setName("");
        setText("");
        setAge("");
        setPrice("");
    };
    const [active, setActive] = useState();
    const togglePara = (value) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const addImageVideo = () => {
        const newData = sortable1.map((items) => {
            if (items.id === selectedDataModal.id) {
                let newArr = items.children.map((child) => {
                    if (child.id === selectedDataModal.value.id) {
                        return { ...child, src: selectedDataModal.value.src, subType: selectedImageOption };
                    }
                    else {
                        return child
                    }
                })
                return { ...items, children: newArr, parent: parentData,subType: selectedImageOption };
            }
            return items;
        });
        setSortable1(newData)
        setBlockModal(false)
    }
    console.log(sortable1);

    const openModalData = (item, id) => {
        setBlockModal(true)
        setselectedDataModal({ ...selectedDataModal, id: id, type: item.type, value: item })
    }

    const multipleImageVideo = (e) => {
        const files = e.target.files;
        const paths = [];

        for (let i = 0; i < files.length; i++) {
            const path = URL.createObjectURL(files[i]);
            paths.push(path);
        }
        setselectedDataModal({ ...selectedDataModal, value: { ...selectedDataModal.value, src: paths } })
    }

    return (
        <div className="grid grid-cols-4 bg-yellow-50 gap-8">

            <Transition appear show={modal1} as={Fragment}>
                <Dialog
                    as="div"
                    open={modal1}
                    onClose={() => closeModal()}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    as="div"
                                    className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark"
                                >
                                    <div className="flex flex-col bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-2">
                                        <div className="text-lg font-bold">
                                            {!selected ? "Add" : "Edit"} Data
                                        </div>

                                        <div className="mt-5 flex flex-col">
                                            <label className="form-label">Enter Text</label>
                                            <input
                                                type="text"
                                                value={text}
                                                className="bg-slate-400"
                                                onChange={(e) => setText(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label className="form-label">Enter Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                className="bg-slate-400"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label className="form-label">Enter Age</label>
                                            <input
                                                type="number"
                                                value={age}
                                                className="bg-slate-400"
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label className="form-label">
                                                Enter Price
                                            </label>
                                            <input
                                                type="number"
                                                value={price}
                                                className="bg-slate-400"
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex justify-end items-center gap-2 mt-8">
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                                                onClick={() => {
                                                    closeModal();
                                                }}
                                            >
                                                Discard
                                            </button>
                                            {!selected && (
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                                                    onClick={() => addDataField()}
                                                >
                                                    Add
                                                </button>
                                            )}
                                            {selected && (
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                                                    onClick={() => editDataField()}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={blockModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={blockModal}
                    onClose={() => setBlockModal(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    as="div"
                                    className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark"
                                >
                                    <div className="flex flex-col bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-2">
                                        <div className="text-lg font-bold">
                                            {selectedDataModal.type === 'image' ? "Add Image" : selectedDataModal.type === 'video' ? 'Add Video' : ''} Data
                                        </div>
                                        {selectedDataModal.type === 'image' &&
                                            (<>
                                                <div className="relative rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300">
                                                    {selectedDataModal?.value?.src?.map((ss, i) => {
                                                        return (
                                                            <img
                                                                key={i}
                                                                src={ss}
                                                                className="h-[140px] w-[220px] object-cover"
                                                            />
                                                        )
                                                    })}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="form-control mt-1"
                                                    multiple
                                                    onChange={multipleImageVideo}
                                                    // onChange={() => {
                                                    //   multipleImageVideo()
                                                    //   setselectedDataModal({ ...selectedDataModal, value: { ...selectedDataModal.value, src: URL.createObjectURL(e.target.files[0]) } })
                                                    // }}
                                                />
                                            </>
                                            )
                                        }

                                        {selectedDataModal.type === 'video' &&
                                            (<>
                                                <div className="relative rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300">
                                                    {selectedDataModal?.value?.src?.map((ss, i) => {
                                                        return (
                                                            <div className="relative rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300" key={i}>
                                                                <video
                                                                    src={ss}
                                                                    className="h-[140px] w-[220px] object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-2 right-2 cursor-pointer rounded-full bg-white/50 p-2"
                                                                    onClick={() => {
                                                                        setselectedDataModal({ ...selectedDataModal, value: { ...selectedDataModal.value, src: selectedDataModal?.value?.src?.splice(i, 1) } })}}
                                                                >
                                                                    <IconTrash className="h-[18px] w-[18px] text-danger" />
                                                                </button>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="form-control mt-1"
                                                    multiple
                                                    onChange={multipleImageVideo}
                                                />
                                            </>)
                                        }
                                        {selectedDataModal?.value?.src?.length > 1 &&
                                            <div className="flex gap-2 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px] mt-4">
                                                <label className="form-label">Select option :- </label>
                                                <select name="product_measurement_type" value={selectedImageOption} onChange={(e) => setSelectedImageOption(e.target.value)} className="form-select bg-cyan-50 font-bold w-100 border rounded" >
                                                    <option value="">Select option...</option>
                                                    <option value="grid">Grid</option>
                                                    <option value="gallary">Gallary</option>
                                                    <option value="slider">Slider</option>
                                                </select>
                                            </div>
                                        }

                                        <div className="flex gap-2 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px] mt-4">
                                            <label className="form-label">Select parent option :- </label>
                                            <select name="product_measurement_type" value={parentData} onChange={(e) => setParentData(e.target.value)} className="form-select bg-cyan-50 font-bold w-100 border rounded" >
                                                <option value="">Select parent option...</option>
                                                <option value="nikunj">nikunj</option>
                                                <option value="nitin">nitin</option>
                                                <option value="meet">meet</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end items-center gap-2 mt-8">
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                                                onClick={() => setBlockModal(false)}
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
                                                onClick={addImageVideo}
                                            >
                                                {selectedDataModal.type === 'image' ? "Add Image" : selectedDataModal.type === 'video' ? 'Add Video' : ''}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <div className="flex flex-col">
                <div className="flex items-center text-2xl">
                    <button type="button" className="bg-orange-400 inline-block text-white font-bold py-2 px-4 rounded my-3">List</button>
                </div>
                <ul>
                    <ReactSortable
                        list={sortable1}
                        setList={(item) => {
                            let arrr = item
                            const headerObj = arrr.find((obj) => obj?.type === 'header');
                            const footerObj = arrr.find((obj) => obj?.type === 'footer');
                            arrr = arrr.filter((d) => d.type !== 'header' && d.type !== 'footer');
                            if (headerObj) {
                                arrr.splice(0, 0, headerObj);
                            }
                            if (footerObj) {
                                arrr.splice(arrr.length, 0, footerObj)
                            }
                            const filteredArray = arrr.filter((obj, index, arr) => {
                                if (obj?.type && obj?.type === 'header' || obj?.type === 'footer') {
                                    return arr.findIndex((elem) => elem.id === obj.id) === index;
                                } else {
                                    return obj
                                }
                            });
                            setSortable1([...filteredArray]);
                        }}
                        animation={200}
                        delay={2}
                        handle=".handle"
                        filter='.ignore-elements'
                        group={{ name: 'sharedsection', pull: 'false' }}
                    >
                        {sortable1.map((item, i) => {
                            return (
                                <li key={i} className={`${item.type === 'header' || item.type === 'footer' ? 'ignore-elements' : ''} mb-2.5 cursor-grab min-h-[40px]`} onClick={() => togglePara(i)}>
                                    <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                        <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                            <svg className='handle bi bi-list' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                            <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                {item.text}
                                            </div>
                                            {/* <button type="button" onClick={() => editData(item)}>
                                                    edit
                                                </button> */}
                                        </div>
                                    </div>
                                    <AnimateHeight duration={300} height={active === i ? 'auto' : 0} >
                                        <ReactSortable
                                            tag='ul'
                                            className="ml-12"
                                            list={item.children}
                                            setList={(item) => {
                                                const array = sortable1;
                                                array[i].children = item;
                                                setSortable1([...array])
                                            }}
                                            animation={200}
                                            delay={2}
                                            handle=".handle"
                                            group={{ name: 'sharedblock', pull: 'false' }}
                                        >
                                            {item.children.length ? (item.children.map((subItem, j) => {
                                                return (
                                                    <li key={j} className="mb-2.5 cursor-grab"
                                                        onClick={(e) => {
                                                            openModalData(subItem, item.id);
                                                            e.stopPropagation()
                                                        }}
                                                    >
                                                        <div className="bg-slate-400 dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                                            <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                                                <svg className='handle bi bi-list' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                                                </svg>
                                                                <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                                    {subItem.text}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })) : (
                                                <li className="mb-2.5 cursor-grab" onClick={(e) => e.stopPropagation()}>
                                                    <div className="bg-yellow-50-400 dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                                        <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                                            <svg className='handle bi bi-list' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                                            </svg>
                                                            <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                                No block at here
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ReactSortable>
                                    </AnimateHeight>
                                </li>
                            );
                        })}
                    </ReactSortable>
                </ul>
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between">
                    <button type="button" className="bg-orange-400 text-white font-bold py-2 px-4 rounded my-3 text-2xl">section</button>
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 text-2xl"
                            onClick={() => setModal1(true)}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <ul>
                    <ReactSortable
                        list={sortable2}
                        setList={setSortable2}
                        animation={200}
                        delay={2}
                        handle=".handle"
                        group={{ name: 'sharedsection', pull: 'clone' }}
                    >
                        {sortable2.map((item, i) => {
                            return (
                                <li key={i} className="mb-2.5 cursor-grab">
                                    <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                        <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                            <svg className='handle bi bi-list' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                            <div className="text-dark dark:text-[#bfc9d4] text-base">
                                                {item.text}
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-slate-400 border rounded p-1"
                                                onClick={() => editData(item)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ReactSortable>
                </ul>
            </div>

            <div className="flex flex-col ">
                <div className="flex items-center text-2xl">
                    <button type="button" className="bg-orange-400 inline-block text-white font-bold py-2 px-4 rounded my-3">Block</button>
                </div>
                <ReactSortable
                    tag='ul'
                    list={sortable3}
                    setList={setSortable3}
                    animation={200}
                    delay={2}
                    handle=".handle"
                    group={{ name: 'sharedblock', pull: 'clone' }}
                >
                    {sortable3.map((item, i) => {
                        return (
                            <li key={i} className="mb-2.5 cursor-grab" >
                                <div className="bg-slate-400 dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                                    <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                        <svg className='handle bi bi-list' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <div className="text-dark dark:text-[#bfc9d4] text-base">
                                            {item.text}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ReactSortable>
            </div>
            <div>
                <pre>{JSON.stringify(sortable1, null, 2)}</pre>
            </div>
        </div>
    )
}
