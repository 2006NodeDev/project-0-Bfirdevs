/*
The ReimbursementType model is used to track what kind of reimbursement is being submitted. Type possibilities are `Lodging`, `Travel`, `Food`, or `Other`.
```javascript
*/
export class ReimbursementType{
  typeId: number // primary key
  type: string // not null, unique
}
