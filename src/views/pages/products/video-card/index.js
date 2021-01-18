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
import {addToList} from '../../../../store/list/actions';
import RestApi from '../../../../store/service/RestApi';
import {showNotification} from "../../../../store/redux/notificationRedux";

const fields = ['image', 'name', 'chipset', 'memory', 'coreClock', 'boostClock', 'color', 'length','price', 'actions'];

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

const VideoCard = (props) => {
  const dispatch = useDispatch();
  const tag = 'Page::Users';
  const [video, setVideo] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleView, setVisibleView] = useState(false);

  const fetchVideoCard = async () => {
    try {
      let {ok, data} = await props.callApi(RestApi.getVideoCard);
      if (ok) {
        setVideo(data.video);
        setSelectedVideo(data.video[0]);
      }
    } catch (e) {
      console.log(tag, 'FETCH_USER_ERROR', e.message)
    }
  };

  const getListProduct = () => {
    let product = JSON.parse(sessionStorage.getItem('listItems')) === null
      ? [] :
      JSON.parse(sessionStorage.getItem('listItems'));
    setListProduct(product);
  };

  const toggleView = (val) => {
    setVisibleView(val);
  };

  const onClickView = (cpu) => {
    setSelectedVideo(cpu);
    toggleView(true);
  };

  const onClickAdd = (item) => {
    let newComponent = 'operating-system';
    if (listProduct.length === 0) {
      item.component = newComponent;
      listProduct.push(item);
    } else {
      let foundIndex =  listProduct.findIndex(x => x.component === newComponent);
      if (foundIndex === -1){
        item.component = newComponent;
        listProduct.push(item)
      } else {
        item.component = newComponent;
        listProduct[foundIndex] = item;
      }
    }
    sessionStorage.setItem('listItems', JSON.stringify(listProduct));
    dispatch(addToList(listProduct));
    props.history.push('/list')
  };

  useEffect(() => {
    fetchVideoCard();
    getListProduct()
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {props.isLoading === false ?
            <CCard>
              <CCardHeader>
                Video Card
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={video}
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
                    'chipeset':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.chipset}
                          </div>
                        </td>
                      ),
                    'memory':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.memory}
                          </div>
                        </td>
                      ),
                    'coreClock':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.coreClock}
                          </div>
                        </td>
                      ),
                    'boostClock':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.boostClock}
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
                    'length':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.length}
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
      {selectedVideo &&
      <>
        <CModal
          show={visibleView}
          onClose={() => toggleView(false)}
          size="lg"
          color={"info"}
        >
          <CModalHeader closeButton>
            <CModalTitle>{selectedVideo.name}</CModalTitle>
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
                              src={selectedVideo.image}
                              className="c-avatar-img"
                              style={{borderRadius: '0!important'}}
                              alt={selectedVideo.image}
                            />
                          </div>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="text-input">Name</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.name.toString().toUpperCase()}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">ChipSet</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.chipset}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Memory</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p
                            className="form-control-static">{selectedVideo.memory}
                            </p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Core Clock</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.coreClock}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Boost Clock</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.boostClock}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Color</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.color}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Length</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.length}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedVideo.price}</p>
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
)(VideoCard)
