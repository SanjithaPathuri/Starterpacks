#include<stdio.h>
void main()
{
   int i,j,k,n,nf,p[20],frame[10],count=0,avail;
   printf("enter no. of frames:");
   scanf("%d",&nf);
   printf("enter length of input:");
   scanf("%d",&n);
   printf("enter input values:");
   for(i=0;i<n;i++)
   {
	scanf("%d",&p[i]);
   }
   for(i=0;i<nf;i++)
   {
	frame[i]=-1;
   }
   printf("ref string\tpage frame\n");
   j=0;
   for(i=0;i<n;i++)
   {
      printf("%d\t\t",p[i]);
      avail=0;
      for(k=0;k<nf;k++)
      {
	if(frame[k]==p[i])
	{
	  avail=1;
	  for(k=0;k<nf;k++)
          {
             printf("%d\t",frame[k]);
          }
	}
      }
      if(avail==0)
      {
	  frame[j]=p[i];
 	  j=(j+1)%nf;
	  count++;
	  for(k=0;k<nf;k++)
          {
             printf("%d\t",frame[k]);
          }
      }      
      printf("\n");
   }
   printf("no. of page faults=%d",count);
}

