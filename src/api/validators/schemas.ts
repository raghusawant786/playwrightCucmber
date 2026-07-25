/**
 * @deprecated Use the modular schema files in ./schemas/ directory instead
 * 
 * Import from:
 *   - ./schemas/user.schemas.ts     (User-related schemas)
 *   - ./schemas/product.schemas.ts  (Product-related schemas)
 *   - ./schemas/order.schemas.ts    (Order-related schemas)
 *   - ./schemas/common.schemas.ts   (Common/generic schemas)
 * 
 * Or import from the main index:
 *   - import { userSchema, productSchema } from '../validators';
 */

// Re-export everything from the new modular structure for backward compatibility
export * from './schemas';
