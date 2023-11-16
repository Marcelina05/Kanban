import Category from 'models/Category'
import MockEntity from 'mocks/MockEntity'
import Colors from 'enums/Colors'

const MockCategory: Category = {
    ...MockEntity,
    name: 'Mock Category',
    color: Colors.GREEN,
}

export default MockCategory;