
export default {
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080', // Shadow the view behind the modal
      },
      modal: {
        width: '100%',
        height: '100%',
        marginTop: '40%',
        backgroundColor: '#212121',
        paddingLeft: '6%',
        paddingRight: '6%',
        paddingBottom: '6%',
        borderRadius: '10%',
      },
      closeIcon: {
        alignSelf: 'center',
        padding: '3%'
      },
      cardStyle: {
          backgroundColor: '#4D4D4D',
          borderRadius: 10,
          borderColor: '#4D4D4D',
          marginBottom: '5%',
          height: 85,
          //alignItems: 'center',
          //justifyContent: 'center'
      },
      cardItemStyle: {
        backgroundColor: '#4D4D4D',
        borderRadius: 10,
        height: 75,

      },
      cardTextStyle: {
        color: '#EFEFF4',
        fontSize: 24,
        fontFamily: 'asap-regular',
        textAlignVertical: 'center',
        height: 75,
      },
      iconStyle: {
          padding: 10
      },
      expandedFeedTitle: {
        fontFamily: 'asap-medium',
        color: 'white', 
        fontSize: 24, 
        paddingBottom: 20
      },
      expandedFeedText: {
        fontFamily: 'asap-regular',
        color: 'white', 
        fontSize: 18, 
        lineHeight: 24
      }
}