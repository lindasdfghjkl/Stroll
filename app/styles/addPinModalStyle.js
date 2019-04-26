
export default {
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(47, 42, 55, 0.85)', // Shadow the view behind the modal

      },
      modal: {
        width: '90%',
        minHeight: '50%',
        maxHeight: '95%',
        height: '75%',
        backgroundColor: '#1a1821',
        paddingLeft: '6%',
        paddingRight: '6%',
        paddingBottom: '6%',
        borderRadius: '10%',
      },
      modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '3%'
      },
      modalTitle: {    
        fontSize: 24,
        color: 'white',
        paddingTop: '3%',
        paddingBottom: '4%',
        fontFamily: 'asap-medium'
      },
      closeIcon: {
        marginLeft: 'auto',
        paddingTop: '3%',
        paddingBottom: '4%'
      },
      titleInput: {
        minHeight: '5%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '2.5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },
      noteInput: {
        minHeight: '20%',
        height: '45%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '2.5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },
      tagsInput: {
        minHeight: '5%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '2.5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },

      buttonsView: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        height: '3%',
        bottom: '3%',
        paddingTop: '2.5%'
      },
      postIcon: {
        width: 35,
        height: 35,
        //margin: '3%',
      },
      selectImgIcon: {
        width: 25,
        height: 25,
       // margin: '3%',  
      },
      cameraIcon: {
        width: 25,
        height: 25,
       // margin: '3%',
      },

      imgThumb: {
        left: 0,
        paddingLeft: '3%',
        paddingBottom: '2.5%',
        paddingTop: '2.5%',
        width: 45,
        height: 45,
        resizeMode: 'contain',
      },
}