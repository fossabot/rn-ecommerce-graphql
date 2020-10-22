import { useQuery, gql } from '@apollo/client';

function categoryQuery(props) {
  return gql`
    {
      category(id: 2) {
        products {
          total_count
          page_info {
            current_page
            page_size
          }
        }
        children_count
        children {
          id
          level
          name
          path
          children {
            id
            level
            name
            path
            children {
              id
              level
              name
              path
              children {
                id
                level
                name
                path
              }
            }
          }
        }
      }
    }
  `;
}
export default categoryQuery;
