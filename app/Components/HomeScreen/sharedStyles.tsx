import { StyleSheet, Platform } from 'react-native';

const sharedStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#0B0406',
    marginBottom: 10,
    marginLeft: 15,
    textAlign: 'left',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: '100%',
    height: 150,
  },
  category: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFD700',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    margin: 5,
    textAlign: 'left',
    marginLeft: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#6747E9',
    textAlign: 'center',
    margin: 5,
   
  },
  location: {
    fontSize: 12,
    color: '#888',
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Light',
  },
  button: {
    backgroundColor: '#FFD42D',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0B0406',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#555',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  itemTextPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '300',
    color: 'gray',
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default sharedStyles;
