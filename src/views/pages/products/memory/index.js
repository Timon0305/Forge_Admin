import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from "react-redux";
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CImg,
} from '@coreui/react'
import ApiRedux from '../../../../store/redux/apiRedux';
import {addToList} from '../../../../store/list/actions'
import RestApi from '../../../../store/service/RestApi';
import {showNotification} from "../../../../store/redux/notificationRedux";

const fields = ['image', 'name', 'speed', 'modules', 'gbprice', 'color', 'flatency', 'clatency','price', 'actions'];

const Loading = () => {
  return (
    <div className="d-flex justify-content-center"
         style={{height: '100vh', flexDirection: 'row', alignItems: 'center'}}>
      <div className="spinner-border text-primary" role="status" style={{width: 100, height: 100}}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
};

const Memory = (props) => {
  const dispatch = useDispatch();
  const tag = 'Page::Users';
  const [memory, setMemory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [visibleView, setVisibleView] = useState(false);

  const fetchMemory = async () => {
    try {
      let {ok, data} = await props.callApi(RestApi.getMemory);
      if (ok) {
        setMemory(data.memory);
        setSelectedMemory(data.memory[0]);
      }
    } catch (e) {
      console.log(tag, 'FETCH_USER_ERROR', e.message)
    }
  };

  const getListProduct = async () => {
    let product = JSON.parse(sessionStorage.getItem('listItems')) === null
      ? [] :
      JSON.parse(sessionStorage.getItem('listItems'));
    setListProduct(product);
  };

  const toggleView = (val) => {
    setVisibleView(val);
  };

  const onClickView = (cpu) => {
    setSelectedMemory(cpu);
    toggleView(true);
  };

  const onClickAdd = (item) => {
    const newComponent = 'memory';
    for (let i = 0 ; i < listProduct.length; i ++) {
      listProduct[i].key = i;
    }
    item.component = newComponent;
    listProduct.push(item);
    sessionStorage.setItem('listItems', JSON.stringify(listProduct));
    dispatch(addToList(listProduct));
    props.history.push('/list')
  };

  useEffect(() => {
    fetchMemory();
    getListProduct()
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {props.isLoading === false ?
            <CCard>
              <CCardHeader>
                Memory
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={memory}
                  fields={fields}
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    'image':
                      (item) => (
                        <td className="text-left v-align">
                          <div className="c-avatar">
                            <img src={item.image} className="c-avatar-img" style={{borderRadius: 'none!important'}} alt="avatar"/>
                          </div>
                        </td>
                      ),
                    'name':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.name}
                          </div>
                        </td>
                      ),
                    'speed':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.speed}
                          </div>
                        </td>
                      ),
                    'modules':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.modules}
                          </div>
                        </td>
                      ),
                    'gbprice':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.gbprice}
                          </div>
                        </td>
                      ),
                    'color':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.color}
                          </div>
                        </td>
                      ),
                    'flatency':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.flatency}
                          </div>
                        </td>
                      ),
                    'clatency':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.clatency}
                          </div>
                        </td>
                      ),
                    'price':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.price}
                          </div>
                        </td>
                      ),
                    'actions':
                      (item) => (
                        <td className='v-align'>
                          <CButton active variant="ghost" color="info" aria-pressed="true" size="sm"
                                   className={"btn-pill"} onClick={() => onClickView(item)}>View</CButton>&nbsp;
                          <CButton active variant="ghost" color="success" aria-pressed="true" size="sm"
                                   className={"btn-pill"} onClick={() => onClickAdd(item)}>Add</CButton>&nbsp;
                        </td>
                      )

                  }}
                />
              </CCardBody>
            </CCard>
            :
            <Loading/>}
        </CCol>
      </CRow>
      {selectedMemory &&
      <>
        <CModal
          show={visibleView}
          onClose={() => toggleView(false)}
          size="lg"
          color={"info"}
        >
          <CModalHeader closeButton>
            <CModalTitle>{selectedMemory.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12" md="12">
                <CCard>
                  <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <div style={{width: 200, height: 200, margin: 'auto'}}>
                            <CImg
                              src={selectedMemory.image}
                              className="c-avatar-img"
                              style={{borderRadius: '0!important'}}
                              alt={selectedMemory.image}
                            />
                          </div>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="text-input">Name</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.name.toString().toUpperCase()}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Speed</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.speed}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Modules</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p
                            className="form-control-static">{selectedMemory.modules}
                          </p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price/GB</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.gbprice}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Color</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.color}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">First Word Latency</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.flatency}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">CAS Latency</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.clatency}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedMemory.price}</p>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" onClick={() => toggleView(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </>}

    </>
  )
};

export default connect(
  (state) => ({
    isLoading: state.loadingIndicator.counter === 1,
  }),
  (dispatch) => ({
    callApi: (method, ...args) => new Promise((resolve, reject) => {
      dispatch(ApiRedux.callApi(method, resolve, ...args), reject)
    }),
    callApi2: (method, callback, ...args) => dispatch(ApiRedux.callApi(method, callback, ...args)),
    toast: (type, message) => dispatch(showNotification(type, message))
  })
)(Memory)
