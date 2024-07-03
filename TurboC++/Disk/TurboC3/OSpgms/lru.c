#include<stdio.h>
void main()
{
   int i,j,k,l,n,nf,p[20],frame[10],count=0,dfr[10];
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
   for(i=0;i<n;i++)
   {
        printf("%d\t\t",p[i]);
        for(j=0;j<nf;j++)
        {
	     if(p[i]==frame[j])
             {
           	break;
             }
             if(j==nf)
             {
	         for(j=0;j<nf;j++)
                 {
    	      	     dfr[j]=frame[j];
	      	     for(k=i;k>=0;k--)
	      	     {
	         	for(j=0;j<nf;j++)
		   	if(p[k]==dfr[j])
		   	{
		       		dfr[j]=-2;
				l=j;
		       		break;
		   	}
	       	     }
                 }
	         for(j=0;j<nf;j++)
	         {
	             if(dfr[j]!=-2)
		       break;		  
	         }
	         if(j==nf)
	         {
                      frame[l]=p[i];
	         }
	         else
	         {
	                frame[j]=p[i];
	      		count=count+1;
            	 }
	  	for(k=0;k<nf;k++)
          	{
	      		if(frame[k]!=-1)
	      		{
	          		printf("%d\t",frame[k]);
	      		}
          	}
	  	printf("\n");
             }
         }
   }
   printf("no. of page faults=%d",count);
}

