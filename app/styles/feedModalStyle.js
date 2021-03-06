
export default {
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(47, 42, 55, 0.85)', // Shadow the view behind the modal
      },
      modal: {
        width: '100%',
        height: '100%',
        marginTop: '40%',
        backgroundColor: '#1a1821',
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
          backgroundColor: '#4e4c51',
          borderRadius: 10,
          borderColor: '#4D4D4D',
          marginBottom: '5%',
          height: 100,
          //alignItems: 'center',
          //justifyContent: 'center'
      },
      cardItemStyle: {
        backgroundColor: '#4e4c51',
        borderRadius: 10,
        height: 75,

      },
      cardTextStyle: {
        // message title
        color: '#EFEFF4',
        fontSize: 18,
        fontFamily: 'asap-regular',
        textAlignVertical: 'bottom',
        height: 75,
        lineHeight: 20
      },
      iconStyle: {
          padding: 10,
          width: 20,
          height: 30,
          resizeMode: 'contain'
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
      },
      timestamp: {
        color: '#EFEFF4',
        fontSize: 14,
        fontFamily: 'asap-regular',
        textAlignVertical: 'center',
        height: 20,
        bottom: 10,
      },
      tagsView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tag: {
        overflow: 'hidden',
        flexDirection: 'column',
        marginRight: 6,
        padding: 4,
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'asap-regular',
        textAlignVertical: 'center',
        height: 20,
        borderRadius: 3,
        bottom: 25,
      },
      searchIcon: {
        bottom: 15,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'flex-end'

      }
}