import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from './fetch';

// Get all products
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams ? `/products?${queryParams}` : '/products';
      return fetchApi(endpoint);
    },
  });
};

// Get product by ID
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      return fetchApi(`/products/${productId}`);
    },
    enabled: !!productId,
  });
};

// Get product recommendations
export const useProductRecommendations = (productId) => {
  return useQuery({
    queryKey: ['product-recommendations', productId],
    queryFn: async () => {
      return fetchApi(`/products/${productId}/recommendations`);
    },
    enabled: !!productId,
  });
};

// Add product to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      return fetchApi('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Get cart items
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return fetchApi('/cart');
    },
  });
}; 